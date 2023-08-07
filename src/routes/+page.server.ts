import {supabase} from '$lib/database';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
export const actions = {
	signup: async ({ cookies, request }) => {
		const formData = await request.formData();
    if(formData.get('password')?.length < 6){
      return fail(422, {
				error: 'Your password must be 6 or more characters.'
			});
    }
    if(formData.get('confirmPassword') != formData.get('password')){
      return fail(422, {
				error: 'Your passwords do not match.'
			});
    }
    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    if (error != null){
      return fail(422, {
				error: error.message
			});
    }
    cookies.set('user', data.user.id, { path: '/' });
    throw redirect(302, '/dashboard')
	},
  login: async ({ cookies, request }) => {
		const formData = await request.formData();
    if(formData.get('password')?.length < 6){
      return fail(422, {
				error: 'Your password must be 6 or more characters.'
			});
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    if (error != null){
      return fail(422, {
				error: error.message
			});
    }
    cookies.set('user', data.user.id, { path: '/' });
    throw redirect(302, '/dashboard')
	}
};