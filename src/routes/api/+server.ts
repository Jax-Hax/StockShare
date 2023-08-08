import {supabase} from '$lib/database';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { partyID } = await request.json();

	const userid = cookies.get('user');
	const { id } = await database.createTodo({ userid, description });

	return json({ id }, { status: 201 });
}