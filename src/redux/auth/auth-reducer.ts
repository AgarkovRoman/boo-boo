import { Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../../api/api'
import {
  AuthActionCreatorsType,
  AuthI,
  AuthStateI,
  FirebaseUserI,
  setAuthUserDataActionType,
  signOutUserActionType,
  UserI,
} from './auth-types'

export const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'

const initialState: AuthI = {
  user: {
    userId: '',
    userEmail: '',
    userName: '',
  },
}

export const authReducer = (state = initialState, action: AuthActionCreatorsType): AuthI => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        user: { ...action.payload },
      }
    }
    case SIGN_OUT_USER: {
      return {
        ...state,
        user: { ...action.payload },
      }
    }
    default:
      return state
  }
}

/* ActionCreators */

export const setAuthUserData = ({
  userId,
  userEmail,
  userName,
}: UserI): setAuthUserDataActionType => ({
  type: SET_AUTH_USER_DATA,
  payload: { userId, userEmail, userName },
})

export const signOutUser = ({ userId, userEmail, userName }: UserI): signOutUserActionType => ({
  type: SIGN_OUT_USER,
  payload: { userId, userEmail, userName },
})

/* ThunkCreators */
export const authMeTC = (): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  const userFromLocalStorage: string | null = localStorage.getItem('authUser')
  if (typeof userFromLocalStorage === 'string' && userFromLocalStorage.length > 0) {
    const userFromLocalStorageParse: UserI = JSON.parse(userFromLocalStorage)
    dispatch(setAuthUserData(userFromLocalStorageParse))
  } else {
    await authAPI.authMe((user: FirebaseUserI) => {
      if (user) {
        const { uid, email, displayName }: FirebaseUserI = user
        const authUser = { userId: uid, userEmail: email, userName: displayName }
        dispatch(setAuthUserData(authUser))
        localStorage.setItem('authUser', JSON.stringify(authUser))
        return authUser
      }
      return { userId: '', userEmail: '', userName: '' }
    })
  }
}

export const signInTC = (
  email: string,
  password: string
): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  await authAPI
    .signIn(email, password)
    .then(() => {
      dispatch(authMeTC())
    })
    .catch((error) => console.log(error))
}

export const signUpTC = (
  email: string,
  password: string,
  name: string
): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  await authAPI
    .signUp(email, password, name)
    .then((result) => {
      authAPI.addUser({
        userEmail: email,
        userName: name,
        userId: result.user ? result.user.uid : '',
      })
      return result.user?.updateProfile({ displayName: name })
    })
    .then(() => {
      dispatch(authMeTC())
    })
}

export const signOutTC = (): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  await authAPI
    .signOut()
    .then(() => {
      dispatch(signOutUser({ userId: '', userEmail: '', userName: '' }))
      localStorage.removeItem('authUser')
    })
    .catch((error) => console.log(error))
}
