import {supabase} from '$lib/database';
import {error as svelteError} from '@sveltejs/kit';
export async function load({ cookies }) {
	const userID = cookies.get('user');
	const { data, error } = await supabase
		.from('usersInParty')
		.select('*')
		.eq('user_id',userID)
		.select('party_id')
	console.log(error, data);
	if (error != null) throw svelteError(420, "SQL Error: " + error.message + ", try refreshing the page");
	return {
		userID
	};
}