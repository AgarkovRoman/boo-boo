import { AuthStateI, UserI } from './auth-types'

// export const getUserId = (state: AuthStateI): string => state.auth.user.userId
export const getUser = (state: AuthStateI): UserI => state.auth.user || {}
