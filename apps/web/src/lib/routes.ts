export const routes = {
  auth: {
    login: '/login',
    register: '/register',
    createWorkspace: '/create-workspace',
  },

  workspace: {
    inbox: (workspace: string) => `/${workspace}/inbox`,
    settings: (workspace: string) => {
      return {
        index: `/${workspace}/settings`,

        account: {
          profile: `${workspace}/settings/account/profile`,
          preferences: `${workspace}/settings/account/preferences`,
        },
      }
    },
  },
}
