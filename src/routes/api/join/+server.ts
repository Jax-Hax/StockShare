import { supabase } from '$lib/database';
import { json } from '@sveltejs/kit';
import yahooFinance from 'yahoo-finance2';

export async function POST({ request, cookies }) {
	const { partyID } = await request.json();
	const userID = cookies.get('user');
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
		console.log(error)
	}
	//players formatted stock data from yahoofinance
	//necessary data: symbol, am invested, total, price, day's gain % and $, total gain % and $, quantity
	//data supabase has: ticker, invested_date, amount_invested, sold_date, price_when_invested
	//data processing we need to do: look up symbol, get current price (price), divide price_when_invested and amount_invested to get quantity, 
	//multiply quantity by current price to get total, subtract total from am_invested to get total_gain, 
	//use quoteSummary to get the open or previousClose for the price that morning, and use curPrice and that for the daily change
	let stockData: any = [];
    const queryOptions = { modules: ['price', 'summaryDetail'] };

    for (const stock of data || []) {
        const result = await yahooFinance.quoteSummary(stock.ticker, queryOptions);
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
    return json({ stockData, leaderboard }, { status: 201 });

}