import { fail, redirect } from '@sveltejs/kit'

export async function load({ url, locals: { supabase, getSession }}) {
  const session = await getSession()

	if (session) {
	  throw redirect(302, '/dashboard')
	}
  const code = url.searchParams.get('code')
	if (code) {
		const { error } = await supabase.auth.verifyOtp({ token_hash: code, type: 'invite'})
		if (error) console.log(error.message);
    throw redirect(302, '/dashboard');
	}
}
export const actions = {
  signup: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    if (password != formData.get('confirmPassword')){
      return fail(422, { message: 'Your passwords do not match', success: false })
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    })

    if (error) {
      console.log(error)
      return fail(422, { message: error.message, success: false, email })
    }

    return {
      message: 'Please check your email for a confirmation email to log into the website. If you do not get one, try logging in, as you might already have an account with that email.',
      success: true,
    }
  },
  login: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log(error)
      return fail(422, { message: error.message, success: false, email })
    }

    throw redirect(302, `/auth/callback`)
  },
}