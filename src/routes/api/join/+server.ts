import {supabase} from '$lib/database';
import { json } from '@sveltejs/kit';
import yahoofinance from 'yahoo-finance2';

export async function POST({ request, cookies }) {
	const { partyID } = await request.json();
	const userID = cookies.get('user');
	//leaderboard
	const { data: leaderboard, error: usersInPartyError } = await supabase
		.from('usersInParty')
		.select('name, money')
		.eq('party_id', partyID)
		.order('money', { ascending: false })
	if(usersInPartyError != null){
		console.log(usersInPartyError)
	}
	//players stock data from supabase
    const { data, error } = await supabase
		.from('stocks')
		.select('amount_invested, ticker, invested_date, sold_date')
		.eq('party_id', partyID)
        .eq('user_id', userID);
	if(error != null){
		console.log(error)
	}
	//players formatted stock data from yahoofinance
	return json({ data, leaderboard }, { status: 201 });
}