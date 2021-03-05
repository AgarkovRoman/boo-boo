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
  userId: '',
  userEmail: '',
  userName: '',
}

export const authReducer = (state = initialState, action: AuthActionCreatorsType): AuthI => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case SIGN_OUT_USER: {
      return {
        ...state,
        ...action.payload,
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
  await authAPI.authMe((user: FirebaseUserI) => {
    if (user) {
      const { uid, email, displayName }: FirebaseUserI = user
      dispatch(setAuthUserData({ userId: uid, userEmail: email, userName: displayName }))
      // localStorage.setItem('authUser', JSON.stringify(user))
      return user
    }
    return null
  })
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
    })
    .catch((error) => console.log(error))
}
