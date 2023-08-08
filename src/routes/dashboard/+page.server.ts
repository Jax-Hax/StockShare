import {supabase} from '$lib/database';

export async function load({ cookies }) {
	const userID = cookies.get('user');
	const { data, error } = await supabase
		.from('usersInParty')
		.select('*')
		.eq('user_id',userID)
	console.log(error, data);
	return {
		userID
	};
}