import { fail, redirect } from '@sveltejs/kit';
import yahooFinance from 'yahoo-finance2';
import { SENDGRID_API_KEY } from '$env/static/private'
import sgMail from '@sendgrid/mail';
export async function load({ cookies, locals: { supabase, getSession } }) {
	const partyID = cookies.get('party_id');
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/')
	}
	const userID = session.user.id
	//players stock data from supabase
	const { data, error } = await supabase
		.from('stocks')
		.select('amount_invested, ticker, invested_date, price_when_invested,stock_id')
		.eq('party_id', partyID)
		.eq('user_id', userID);
	if (error != null) {
		console.log(error.message)
	}
	//players formatted stock data from yahoofinance
	//necessary data: symbol, am invested, total, price, day's gain % and $, total gain % and $, quantity
	//data supabase has: ticker, invested_date, amount_invested, sold_date, price_when_invested
	//data processing we need to do: look up symbol, get current price (price), divide price_when_invested and amount_invested to get quantity, 
	//multiply quantity by current price to get total, subtract total from am_invested to get total_gain, 
	//use quoteSummary to get the open or previousClose for the price that morning, and use curPrice and that for the daily change
	let stockData: any = [];

	for (const stock of data || []) {
		const result = await yahooFinance.quoteSummary(stock.ticker);
		const price = result.price?.regularMarketPrice;
		const quantity = stock.amount_invested / stock.price_when_invested;
		const total = quantity * price;
		const totalGain = total - stock.amount_invested;
		stockData.push({
			symbol: stock.ticker,
			am_invested: stock.amount_invested.toFixed(2),
			total: total.toFixed(2),
			price: price.toFixed(2),
			price_when_invested: stock.price_when_invested.toFixed(2),
			day_gain_percent: ((price - result.summaryDetail?.open) / result.summaryDetail?.open * 100).toFixed(2),
			total_gain_percent: (((total / stock.amount_invested) - 1) * 100).toFixed(2),
			total_gain_dollar: (totalGain).toFixed(2),
			quantity: quantity.toFixed(2),
			stock_id: stock.stock_id
		});
	}
	//party data
	//players stock data from supabase
	const { data: currentParty, error: partyError } = await supabase
		.from('parties')
		.select('starting_cash,party_name,owner_id,join_password')
		.eq('party_id', partyID);
	if (partyError != null) {
		console.log(partyError.message)
	}
	//add up the total to update the money
	let totalMoney = 0;
	for (let i = 0; i < stockData.length; i++) {
		totalMoney += stockData[i].total
	}
	//cash data
	const { data: cashData, error: cashError } = await supabase
		.from('usersInParty')
		.select('cash_left')
		.eq('party_id', partyID)
		.eq('user_id', userID)
	if (cashError != null) {
		console.log(cashError)
	}
	//update user with that
	const { error: updateError } = await supabase
		.from('usersInParty')
		.update({ money: totalMoney + cashData[0].cash_left })
		.eq('user_id', session?.user.id)
		.eq('party_id', partyID)
	if (updateError) {
		console.log(updateError);
	}
	//regrab player data after update
	const { data: playerData, error: playerError } = await supabase
		.from('usersInParty')
		.select('name, money, cash_left')
		.eq('party_id', partyID)
		.eq('user_id', userID)
	if (playerError != null) {
		console.log(playerError)
	}
	//leaderboard
	const { data: leaderboard, error: usersInPartyError } = await supabase
		.from('usersInParty')
		.select('name, money')
		.eq('party_id', partyID)
		.order('money', { ascending: false })
	if (usersInPartyError != null) {
		console.log(usersInPartyError)
	}
	return { stockData, leaderboard, currentParty, playerData };

}

export const actions = {
	inviteUsers: async ({ locals: { supabase }, request, cookies }) => {
		const formData = await request.formData();
		sgMail.setApiKey(SENDGRID_API_KEY);
		const emails = formData.get("emails")
		const emailList: string[] = emails.split(',').map(email => email.trim());
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		let messages: any = [];
		for (let email of emailList) {
			if (!emailRegex.test(email)) {
				return fail(422, { message: 'Email list is not formatted correctly, type in a full email for each entry (example@example.com)', success: false })
			}
			const { data, error } = await supabase
				.from('emailsToInvite')
				.insert({ email, party_id: cookies.get('party_id') })
				.select('id')
			if (error) {
				console.log(error.message)
			}
			const newEmail = {
				to: email,
				from: 'jaxbulbrook@computerkidva.com',
				subject: 'Join StockShare competition',
				html: `<h1>You have been invited to a StockShare competition, a simulated investing game.</h1><a clicktracking="off" href='https://stockshare.computerkidva.com/dashboard?join_id=${data[0].id}'>Click here to join</a><p>You will have to sign in or make an account first, then click this link once you are logged in, otherwise you will be redirected to the login screen.</p>`,
			};
			messages.push(newEmail);
		}
		try {
			await sgMail.send(messages);
		} catch (error) {
			console.error(error);
		}
	},
	changeName: async ({ locals: { supabase, getSession }, request, cookies }) => {
		const formData = await request.formData();
		const session = await getSession()
		const name = formData.get("displayName");
		const { error } = await supabase
			.from('usersInParty')
			.update({ name })
			.eq('user_id', session?.user.id)
			.eq('party_id', cookies.get('party_id'))
		if (error) {
			console.log(error);
			return fail(422, {
				error: error.message,
			});
		}
	},
	sellStock: async ({ locals: { supabase, getSession }, request, cookies }) => {
		//get the stock to sell, add the money made to cash (money is total including cash so dont subtract from it). Then remove the stock
		const formData = await request.formData();
		const stockID = formData.get("stockToSell");
		const partyID = cookies.get('party_id');
		const session = await getSession()
		const userID = session.user.id;
		const cashLeft = parseFloat(formData.get('cashLeft'));
		const stockTotal = parseFloat(formData.get('stockTotal'));
		const { error: usersInPartyError } = await supabase
			.from('usersInParty')
			.update({ cash_left: (cashLeft + stockTotal) })
			.eq('party_id', partyID)
			.eq('user_id', userID)
		if (usersInPartyError) {
			console.log(usersInPartyError)
			return fail(422, {
				error: usersInPartyError.message,
			});
		}
		const { error } = await supabase
			.from('stocks')
			.delete()
			.eq('stock_id', stockID);
		if (error) {
			console.log(error)
			return fail(422, {
				error: error.message,
			});
		}
	},
	sellStockPortion: async ({ locals: { supabase, getSession }, request, cookies }) => {
		//get the stock to sell, add the money made to cash (money is total including cash so dont subtract from it). Then remove the stock
		const formData = await request.formData();
		const stockID = formData.get("stockToSell");
		const partyID = cookies.get('party_id');
		const session = await getSession()
		const userID = session.user.id;
		const cashLeft = parseFloat(formData.get('cashLeft'));
		const stockTotal = parseFloat(formData.get('stockTotal'));
		const amToSell = parseInt(formData.get('amToSell'));
		if (stockTotal <= amToSell){
			return fail(422, {
				error: "You cannot sell more than the stock it worth",
			});
		}
		const { error: usersInPartyError } = await supabase
			.from('usersInParty')
			.update({ cash_left: (cashLeft + amToSell) })
			.eq('party_id', partyID)
			.eq('user_id', userID)
		if (usersInPartyError) {
			console.log(usersInPartyError)
			return fail(422, {
				error: usersInPartyError.message,
			});
		}
		let newAm = stockTotal - amToSell
		const { error } = await supabase
			.from('stocks')
			.update({amount_invested: newAm})
			.eq('stock_id', stockID);
		if (error) {
			console.log(error)
			return fail(422, {
				error: error.message,
			});
		}
	},
	buyStock: async ({ locals: { supabase, getSession }, request, cookies }) => {
		//get the stock to sell, add the money made to cash (money is total including cash so dont subtract from it). Then remove the stock
		const formData = await request.formData();
		const partyID = cookies.get("party_id")
		const symbol = formData.get("stockToBuy");
		const session = await getSession()
		const moneyPaid = formData.get("amToBuy");
		//player data
		const { data: playerData, error: playerError } = await supabase
		.from('usersInParty')
		.select('cash_left')
		.eq('party_id', partyID)
		.eq('user_id', session?.user.id)
		if (playerError != null) {
			console.log(playerError)
		}
		if(playerData[0].cash_left < moneyPaid){
			return fail(422, {error: "you do not have enough money to buy this",})
		}
		//update user with that
		const { error: updateError } = await supabase
			.from('usersInParty')
			.update({ cash_left: playerData[0].cash_left - moneyPaid })
			.eq('user_id', session?.user.id)
			.eq('party_id', partyID)
		if (updateError) {
			console.log(updateError);
		}
		const result = await yahooFinance.quoteSummary(symbol);
		const price = result.price?.regularMarketPrice;
		const { error } = await supabase
			.from('stocks')
			.insert({
				party_id: cookies.get('party_id'),
				user_id: session?.user.id,
				ticker: symbol,
				price_when_invested: price,
				amount_invested: moneyPaid
			})
		if (error) {
			console.log(error)
			return fail(422, {
				error: error.message,
			});
		}
	},
	refreshAllUsers: async ({ locals: { supabase, getSession }, request, cookies }) => {
		const partyID = cookies.get('party_id');
		const session = await getSession();
		const userID = session.user.id
		//party data
		const { data: owner_id, error: partyError } = await supabase
			.from('parties')
			.select('owner_id')
			.eq('party_id', partyID);
		if (owner_id[0].owner_id != userID) {
			return fail(422, {
				error: "you are not authorized to do this",
			});
		}
		if (partyError != null) {
			console.log(partyError.message)
		}
		//players stock data from supabase
		const { data, error } = await supabase
			.from('stocks')
			.select('amount_invested, ticker, invested_date, price_when_invested,stock_id,user_id')
			.eq('party_id', partyID)
			.order('user_id')
		if (error != null) {
			console.log(error.message)
		}
		let money: any = [];
		let current_user_id = data[0].user_id
		for (const stock of data || []) {
			if (stock.user_id == current_user_id) {
				const result = await yahooFinance.quoteSummary(stock.ticker);
				const price = result.price?.regularMarketPrice;
				const quantity = stock.amount_invested / stock.price_when_invested;
				const total = quantity * price;
				money.push(total);
			}
			else {
				//add up the total to update the money
				let totalMoney = 0;
				for (let i = 0; i < money.length; i++) {
					totalMoney += money[i]
				}
				//cash data
				const { data: cashData, error: cashError } = await supabase
					.from('usersInParty')
					.select('cash_left')
					.eq('party_id', partyID)
					.eq('user_id', current_user_id)
				if (cashError != null) {
					console.log(cashError)
				}
				//update user with that
				const { error: updateError } = await supabase
					.from('usersInParty')
					.update({ money: totalMoney + cashData[0].cash_left })
					.eq('user_id', current_user_id)
					.eq('party_id', partyID)
				if (updateError) {
					console.log(updateError);
				}
				money = []
				current_user_id = stock.user_id
				const result = await yahooFinance.quoteSummary(stock.ticker);
				const price = result.price?.regularMarketPrice;
				const quantity = stock.amount_invested / stock.price_when_invested;
				const total = quantity * price;
				money.push(total);
			}
		}
		let totalMoney = 0;
		for (let i = 0; i < money.length; i++) {
			totalMoney += money[i]
		}
		//cash data
		const { data: cashData, error: cashError } = await supabase
			.from('usersInParty')
			.select('cash_left')
			.eq('party_id', partyID)
			.eq('user_id', current_user_id)
		if (cashError != null) {
			console.log(cashError)
		}
		//update user with that
		const { error: updateError } = await supabase
			.from('usersInParty')
			.update({ money: totalMoney + cashData[0].cash_left })
			.eq('user_id', current_user_id)
			.eq('party_id', partyID)
		if (updateError) {
			console.log(updateError);
		}
	}
}