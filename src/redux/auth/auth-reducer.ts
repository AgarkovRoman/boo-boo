import { Action, createSlice } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { AuthI, AuthStateI, UserIServer } from './auth-types'

export const initialState: AuthI = {
  user: {
    userId: '',
    userEmail: '',
    userName: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload
    },
  },
})

export const { setAuthUser } = authSlice.actions
export default authSlice.reducer

/* ThunkCreators */
export const authMeTC = (): ThunkAction<void, AuthStateI, unknown, Action> => async (dispatch) => {
  const userFromLocalStorage: string | null = localStorage.getItem('authUser')
  if (typeof userFromLocalStorage === 'string' && userFromLocalStorage.length > 0) {
    const userFromLocalStorageParse: UserIServer = JSON.parse(userFromLocalStorage)
    const { id: userId, email: userEmail = '', name: userName = '' } = userFromLocalStorageParse
    dispatch(setAuthUser({ userId, userEmail, userName }))
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
