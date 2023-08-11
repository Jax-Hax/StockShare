import { fail } from '@sveltejs/kit'

export const actions = {
  signup: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

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
      message: 'Please check your email for a magic link to log into the website.',
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

    return {
      message: 'Please check your email for a magic link to log into the website.',
      success: true,
    }
  },
}