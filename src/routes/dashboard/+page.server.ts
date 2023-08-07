import {supabase} from '$lib/database'
export const actions = {
	signup: async ({ cookies, request }) => {
		const data = await request.formData();
    const { signUpData, error } = await supabase.auth.signUp({
        email: data.get('email'),
        password: data.get('password'),
      })
    return {user: signUpData};
	}
};