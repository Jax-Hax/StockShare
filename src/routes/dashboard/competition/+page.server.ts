import { fail, redirect } from '@sveltejs/kit';
import yahooFinance from 'yahoo-finance2';
import { SENDGRID_API_KEY } from '$env/static/private'
import sgMail from '@sendgrid/mail';
import { page } from '$app/stores';
export async function load({ cookies, locals: { supabase, getSession } }) {
	const partyID = cookies.get('party_id');
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/')
	}
	const userID = session.user.id
	//leaderboard
	const { data: leaderboard, error: usersInPartyError } = await supabase
		.from('usersInParty')
		.select('name, money')
		.eq('party_id', partyID)
		.order('money', { ascending: false })
	if (usersInPartyError != null) {
		console.log(usersInPartyError)
	}
	//players stock data from supabase
	const { data, error } = await supabase
		.from('stocks')
		.select('amount_invested, ticker, invested_date, price_when_invested,quantity')
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
		const total = stock.quantity * price;
		const totalGain = total - stock.amount_invested;

		stockData.push({
			symbol: stock.ticker,
			am_invested: stock.amount_invested.toFixed(2),
			total: total.toFixed(2),
			price: price.toFixed(2),
			price_when_invested: stock.price_when_invested.toFixed(2),
			day_gain_percent: ((price - result.summaryDetail?.open) / result.summaryDetail?.open * 100).toFixed(2),
			day_gain_dollar: (total - (result.summaryDetail?.open * stock.quantity)).toFixed(2),
			total_gain_percent: (((total / stock.amount_invested) - 1) * 100).toFixed(2),
			total_gain_dollar: (totalGain).toFixed(2),
			quantity: (stock.quantity).toFixed(2),
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
	return { stockData, leaderboard, currentParty };

}

export const actions = {
	inviteUsers: async ({ locals: { supabase }, request, cookies }) => {
		const formData = await request.formData();
		sgMail.setApiKey(SENDGRID_API_KEY);
		const emails = formData.get("emails")
		const emailList:string[] = emails.split(',').map(email => email.trim());
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
				html: `<h1>You have been invited to a StockShare competition, a simulated investing game.</h1><a clicktracking="off" href='http://localhost:5173/dashboard?join_id=${data[0].id}'>Click here to join</a>`,
			};
			messages.push(newEmail);
		}
		try {
			await sgMail.send(messages);
		  } catch (error) {
			console.error(error);
		  }
	}
}