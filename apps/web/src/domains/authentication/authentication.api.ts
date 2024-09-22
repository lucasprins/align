import { login } from './api/login'
import logout from './api/logout'

export const AuthenticationEndpoints = {
  login: '/auth/login',
  logout: '/auth/logout',
  register: '/auth/register',
}

export const AuthenticationAPI = {
  login,
  logout,
}
