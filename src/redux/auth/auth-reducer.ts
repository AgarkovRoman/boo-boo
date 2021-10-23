import { Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../../api/api'
import {
  AuthActionCreatorsType,
  AuthI,
  AuthStateI,
  setAuthUserDataActionType,
  signOutUserActionType,
  UserI,
  UserIServer,
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
    const userFromLocalStorageParse: UserIServer = JSON.parse(userFromLocalStorage)
    const { id: userId, email: userEmail = '', name: userName = '' } = userFromLocalStorageParse
    dispatch(setAuthUserData({ userId, userEmail, userName }))
  }
  // else {
  //   await authAPI.authMe((user: FirebaseUserI) => {
  //     if (user) {
  //       const { uid, email, displayName }: FirebaseUserI = user
  //       const authUser = { userId: uid, userEmail: email, userName: displayName }
  //       dispatch(setAuthUserData(authUser))
  //       localStorage.setItem('authUser', JSON.stringify(authUser))
  //       return authUser
  //     }
  //     return { userId: '', userEmail: '', userName: '' }
  //   })
  // }
}

export const signInTC = (
  login: string,
  password: string
): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  await authAPI
    .signIn(login, password)
    .then((authUser) => {
      localStorage.setItem('authUser', JSON.stringify(authUser))
      dispatch(authMeTC())
    })
    .catch((error) => console.log(error))
}

export const signUpTC = (
  login: string,
  password: string
): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  await authAPI.signUp(login, password).then((authUser) => {
    localStorage.setItem('authUser', JSON.stringify(authUser))
    dispatch(authMeTC())
  })
}

export const signOutTC = (): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  const userFromLocalStorage: string | null = localStorage.getItem('authUser')
  if (typeof userFromLocalStorage === 'string' && userFromLocalStorage.length > 0) {
    const userFromLocalStorageParse: UserIServer = JSON.parse(userFromLocalStorage)

    await authAPI
      .signOut(userFromLocalStorageParse.refreshToken)
      .then(() => {
        dispatch(signOutUser({ userId: '', userEmail: '', userName: '' }))
        localStorage.removeItem('authUser')
      })
      .catch((error) => console.log(error))
  } else {
    console.log(`Sorry, we can't logout you, try again later :(`)
  }
}
