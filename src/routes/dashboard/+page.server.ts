import {supabase} from '$lib/database'
export const actions = {
	signup: async ({ cookies, request }) => {
		const formData = await request.formData();
    console.log("form")
    const { data, error } = await supabase.auth.signUp({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      console.log(data)
    return {user: data};
	}
};