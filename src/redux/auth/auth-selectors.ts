import { AuthStateI } from './auth-types'

export const getUserId = (state: AuthStateI): string => state.auth.userId
