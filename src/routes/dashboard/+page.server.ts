import { redirect } from '@sveltejs/kit';
import { error as svelteError } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
export async function load({ locals: { supabase, getSession }, url, cookies }) {
	const session = await getSession()
	//console.log(session)
	if (!session) {
		throw redirect(303, '/')
	}
	const join_id = url.searchParams.get('join_id')
	if (join_id) {
		const { data: emailData, error: emailError } = await supabase
			.from('emailsToInvite')
			.select()
			.eq('id', join_id);
		if (emailError) console.log(emailError.message);
		//join the party you were invited too
		if (session.user.email == emailData[0].email) {
			//the correct user
			//delete the emailsToInvite entry
			const { error: emailDeleteErr } = await supabase
				.from('emailsToInvite')
				.delete()
				.eq('id', join_id);
			if (emailDeleteErr) {
				console.log(emailDeleteErr)
			}
			//add user to party
			const { error } = await supabase
				.from('usersInParty')
				.insert({
					party_id: emailData[0].party_id,
					user_id: session?.user.id,
					money: emailData[0].starting_cash,
					cash_left: emailData[0].starting_cash
				});

			if (error) {
				console.log(error);
				return fail(422, {
					error: error.message,
				});
			}
			cookies.set('party_id', emailData[0].party_id, { path: '/' })
			throw redirect(302, '/dashboard/competition');
		}
		else {
			throw redirect(303, '/')
		}
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
			party_name: getValue('party_name').trim(),
			join_password: getValue('join_password'),
			starting_cash: getValue('starting_cash') || '10000',
			max_stock_num: getValue('max_stock_num'),
			min_stock_price: getValue('min_stock_price') || '0',
		};

		const { data, error: insertError } = await supabase
			.from('parties')
			.insert({
				...insertData,
				owner_id: session?.user.id,
			})
			.select('party_id,starting_cash');
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
				user_id: session?.user.id,
				money: data[0].starting_cash,
				cash_left: data[0].starting_cash
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
	},
	joinParty: async ({ request, cookies }) => {
		const formData = await request.formData();
		const partyID = formData.get('party_id')
		cookies.set('party_id', partyID, { path: '/' })
		throw redirect(302, '/dashboard/competition');
	},
	deleteParty: async ({ locals: { supabase, getSession }, request }) => {
		const formData = await request.formData();
		const partyID = formData.get('party_id')
		const session = await getSession()
		const userID = session?.user.id;
		//delete usersInParty
		const { error } = await supabase
			.from('usersInParty')
			.delete()
			.eq('party_id', partyID);
		if (error) {
			console.log(error)
		}
		//delete stocks
		const { error: error2 } = await supabase
			.from('stocks')
			.delete()
			.eq('party_id', partyID);
		if (error2) {
			console.log(error2)
		}
		//delete party
		const { error: error3 } = await supabase
			.from('parties')
			.delete()
			.eq('party_id', partyID);
		if (error3) {
			console.log(error3)
		}
	},
	joinByPassword: async ({ locals: { supabase, getSession }, request, cookies }) => {
		const session = await getSession()
		const formData = await request.formData();
		const partyName = formData.get('party_name').trim()
		const password = formData.get('join_password').trim()
		const { data, error } = await supabase
			.from('parties')
			.select()
			.eq('party_name',partyName)
			.eq('join_password',password)
		if (error) {
			console.log(error)
			return fail(422, {
				error: error.message,
			});
		}
		if (data.length > 0){
			const { error: dataError } = await supabase
			.from('usersInParty')
			.insert({
				party_id: data[0].party_id,
				user_id: session?.user.id,
				money: data[0].starting_cash,
				cash_left: data[0].starting_cash
			});

			if (dataError) {
				console.log(dataError);
				return fail(422, {
					error: dataError.message,
				});
			}
			cookies.set('party_id', data[0].party_id, { path: '/' })
			throw redirect(302, '/dashboard/competition');
		}
		else{
			return fail(422, {
				error: 'You did not input a valid name/password',
			});
		}
	},
}