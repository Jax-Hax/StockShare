import {supabase} from '$lib/database';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { partyID, user_id } = await request.json();
    const userID = cookies.get('user');
    //delete usersInParty
    const { error } = await supabase
        .from('usersInParty')
        .delete()
        .match({ user_id: userID, party_id: partyID });
	if(error != null){
		console.log(error)
	}
    //delete stocks
    const { error: error2 } = await supabase
        .from('stocks')
        .delete()
        .match({ user_id: userID, party_id: partyID });
	if(error2 != null){
		console.log(error2)
	}
    //delete party
    const { error: error3 } = await supabase
        .from('parties')
        .delete()
        .eq('party_id', partyID);
	if(error2 != null){
		console.log(error2)
	}
    return new Response(null, { status: 204 });
}