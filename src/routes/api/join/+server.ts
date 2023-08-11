import { supabase } from '$lib/database';
import { json } from '@sveltejs/kit';
import yahooFinance from 'yahoo-finance2';

export async function POST({ request, cookies }) {
	const { partyID } = await request.json();
	cookies.set('party_id',partyID,{ path: '/' })

}