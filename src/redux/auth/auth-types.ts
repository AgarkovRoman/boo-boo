import { SET_AUTH_USER_DATA, SIGN_OUT_USER } from './auth-reducer'

export interface AuthStateI {
  auth: AuthI
}

export interface AuthI {
  user: UserI
}

export interface UserI {
  userId: string
  userEmail: string
  userName: string
}

export interface UserIServer {
  id: string
  email?: string
  name?: string
  accessToken: string
  refreshToken: string
}

export interface LogoutResponseI {
  success: boolean
}

export interface SignInI {
  login: string
  password: string
}

export type setAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA
  payload: UserI
}

export type signOutUserActionType = {
  type: typeof SIGN_OUT_USER
  payload: UserI
}

export type AuthActionCreatorsType = signOutUserActionType | setAuthUserDataActionType
