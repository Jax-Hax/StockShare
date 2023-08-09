import {supabase} from '$lib/database';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { partyID, userID } = await request.json();
    const { data, error } = await supabase
		.from('stocks')
		.select()
		.eq('party_id', partyID)
        .eq('user_id', userID);
	return json({ data }, { status: 201 });
}