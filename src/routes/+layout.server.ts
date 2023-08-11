//server side
export const load = async ({ locals: { getSession } }) => {
    return {
      session: await getSession(),
    }
  }