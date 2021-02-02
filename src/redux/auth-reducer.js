import { authAPI } from '../api/api'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

const initialState = {
  userId: null,
  userEmail: null,
  userName: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
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

export const setAuthUserData = ({ userId, userEmail, userName }) => ({
  type: SET_AUTH_USER_DATA,
  payload: { userId, userEmail, userName },
})

/* ThunkCreators */

export const authMeThunkCreator = () => async (dispatch) => {
  await authAPI.authMe((user) => {
    if (user) {
      const { uid, email, displayName } = user
      dispatch(setAuthUserData({ userId: uid, userEmail: email, userName: displayName }))

      // localStorage.setItem('authUser', JSON.stringify(user))

      return user
    }
    return null
  })
}

export const signInThunkCreator = (email, password) => async (dispatch) => {
  await authAPI
    .signIn(email, password)
    .then(() => {
      dispatch(authMeThunkCreator())
    })
    .catch((error) => console.log(error))
}

export const signUpThunkCreator = (email, password, name) => async (dispatch) => {
  await authAPI.signUp(email, password, name).then((result) =>
    result.user?.updateProfile({
      displayName: name,
    })
  )
  // .then((result) => {
  // result.user?.updateProfile({
  //   displayName: name,
  // })
  // })
  dispatch(authMeThunkCreator())
}
