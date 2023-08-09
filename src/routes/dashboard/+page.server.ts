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

		const getValue = (field: string) => {
			const value = formData.get(field);
			return value !== '' ? value : null;
		};

		const insertData = {
			name: getValue('name') || 'Untitled',
			max_players: getValue('max_players'),
			starting_cash: getValue('starting_cash') || '10000',
			max_stock_num: getValue('max_stock_num'),
			index_funds_allowed: formData.get('index_funds_allowed') !== null,
			max_sells: getValue('max_sells'),
			partials_allowed: formData.get('partials_allowed') !== null,
			min_stock_price: getValue('min_stock_price') || '0',
			drip_enabled: formData.get('drip_enabled') !== null,
			leaderboard_enabled: formData.get('leaderboard_enabled') !== null,
			num_users: 1,
		};

		const { data, error: insertError } = await supabase
			.from('parties')
			.insert({
				...insertData,
				owner_id: userID,
			})
			.select();
		if (insertError) {
			console.log(insertError);
			return fail(422, {
				error: insertError.message,
			});
		}
		//add user to party
		const { error } = await supabase
			.from('usersInParty')
			.insert({
				party_id: data[0].party_id,
				user_id: userID
			});

		if (error) {
			console.log(error);
			return fail(422, {
				error: error.message,
			});
		}
		return {
			party: data[0],
			user_id: userID
		}
	}
}