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
