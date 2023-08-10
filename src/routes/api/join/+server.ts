import {supabase} from '$lib/database';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { partyID, userID } = await request.json();
    const { data, error } = await supabase
		.from('stocks')
		.select()
		.eq('party_id', partyID)
        .eq('user_id', userID);
	const { data: leaderboard, error: usersInPartyError } = await supabase
		.from('usersInParty')
		.select('name, money')
		.eq('party_id', partyID)
		.order('money', { ascending: false })
	if(usersInPartyError != null){
		console.log(usersInPartyError)
	}
	return json({ data, leaderboard }, { status: 201 });
}