import {supabase} from '$lib/database';
import {error as svelteError} from '@sveltejs/kit';
export async function load({ cookies }) {
	//get user id
	const userID = cookies.get('user');
	//get the party ids the user is a part of
	const { data, error } = await supabase
		.from('usersInParty')
		.select('*')
		.eq('user_id',userID)
		.select('party_id')
	const partyIdsArray = data.map(item => item.party_id);
	if (error != null) throw svelteError(420, "SQL Error: " + error.message + ", try refreshing the page");
	//get party names
	
	console.log(partyIdsArray);
	
	return {
		userID
	};
}