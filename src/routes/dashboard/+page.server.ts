import { redirect } from '@sveltejs/kit';
import { error as svelteError } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
export async function load({ locals: { supabase, getSession } }) {
	const session = await getSession()

	if (!session) {
	  throw redirect(303, '/')
	}
	//get the party ids the user is a part of
	const { data, error } = await supabase
		.from('usersInParty')
		.select('*')
		.eq('user_id', session.user.id)
		.select('party_id')
	const partyIdsArray = data.map(item => item.party_id);
	if (error) throw svelteError(420, "SQL Error: " + error.message + ", try refreshing the page");
	//get party data
	const { data: parties, error: partyError } = await supabase
		.from('parties')
		.select()
		.in('party_id', partyIdsArray);
	if (partyError) throw svelteError(420, "SQL Error: " + partyError.message + ", try refreshing the page");
	const user_id = session.user.id;
	return {
		parties
	};
}
export const actions = {
	newParty: async ({ locals: { supabase, getSession }, request, cookies }) => {
		const formData = await request.formData();
		const session = await getSession()
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
				owner_id: session?.user.id,
			})
			.select('party_id');
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
				user_id: session?.user.id
			});

		if (error) {
			console.log(error);
			return fail(422, {
				error: error.message,
			});
		}
		cookies.set('party_id', data[0].party_id, { path: '/' })
		throw redirect(302, '/dashboard/competition');
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession()
		if (session) {
		  await supabase.auth.signOut()
		  throw redirect(303, '/')
		}
	  }
}