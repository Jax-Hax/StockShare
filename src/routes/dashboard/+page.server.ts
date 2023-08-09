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
		const userID = cookies.get('user');
		const data = {
			name: formData.get('name'),
			max_players: formData.get('max_players'),
			starting_cash: formData.get('starting_cash'), 
			max_stock_num: formData.get('max_stock_num'), 
			index_funds_allowed: formData.get('index_funds_allowed'), 
			max_sells: formData.get('max_sells'), 
			partials_allowed: formData.get('partials_allowed'), 
			min_stock_price: formData.get('min_stock_price'), 
			drip_enabled: formData.get('drip_enabled'), 
			leaderboard_enabled: formData.get('leaderboard_enabled'),
		}
		console.log(data.index_funds_allowed)
		const { error } = await supabase
			.from('parties')
			.insert({
				name: data.name != '' ? data.name : 'Untitled',
				owner_id: userID,
				max_players: data.max_players != '' ? data.max_players : null,
				starting_cash: data.starting_cash != '' ? data.starting_cash : '10000',
				max_stock_num: data.max_stock_num != '' ? data.max_stock_num : null,
				index_funds_allowed: data.index_funds_allowed != null ? data.index_funds_allowed : false,
				max_sells: data.max_sells != '' ? data.max_sells : null,
				partials_allowed: data.partials_allowed != null ? data.partials_allowed : false,
				min_stock_price: data.min_stock_price != '' ? data.min_stock_price : '0',
				drip_enabled: data.drip_enabled != null ? data.drip_enabled : false,
				leaderboard_enabled: data.leaderboard_enabled != null ? data.leaderboard_enabled : false
			})
		if (error != null) {
			console.log(error)
			return fail(422, {
				error: error.message
			});
		}
	}
}