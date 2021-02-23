import { AuthStateI } from './auth-types'

export const getUserId = (state: AuthStateI) => state.auth.userId
