import { createClient } from '@supabase/supabase-js'
import { SUPABASE_API_KEY,SUPABASE_PROJECT_URL} from '$env/static/private'
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)
export const actions = {
	signup: async ({ cookies, request }) => {
		/*const data = await request.formData();
        const promise = account.create(ID.unique(), data.get('email'), data.get('password'));
        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });*/
	}
};