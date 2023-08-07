import {supabase} from '$lib/database';

export function load({ cookies }) {
	const userID = cookies.get('user');
	return {
		userID
	};
}