import { supabase } from '$lib/database';
import { error as svelteError } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
export async function load({ cookies }) {
	//get user id
	const userID = cookies.get('user');
	//get the party ids the user is a part of
	const { data, error } = await supabase
		.from('usersInParty')
		.select('*')
		.eq('user_id', userID)
		.select('party_id')
	const partyIdsArray = data.map(item => item.party_id);
	if (error != null) throw svelteError(420, "SQL Error: " + error.message + ", try refreshing the page");
	//get party data
	const { data: parties, error: partyError } = await supabase
		.from('parties')
		.select()
		.in('party_id', partyIdsArray);

	return {
		userID,
		parties
	};
}
export const actions = {
	newParty: async ({ cookies, request }) => {
		const formData = await request.formData();

		const { error } = await supabase
			.from('parties')
			.insert({
				name: formData.get('name'),
				owner_id: cookies.get('user'),
				max_players: formData.get('max_players'),
				starting_cash: formData.get('starting_cash'), 
				max_stock_num: formData.get('max_stock_num'), 
				index_funds_allowed: formData.get('index_funds_allowed'), 
				max_sells: formData.get('max_sells'), 
				partials_allowed: formData.get('partials_allowed'), 
				min_stock_price: formData.get('min_stock_price'), 
				drip_enabled: formData.get('drip_enabled'), 
				leaderboard_enabled: formData.get('leaderboard_enabled'),
			})
		if (error != null) {
			return fail(422, {
				error: error.message
			});
		}
	}
}