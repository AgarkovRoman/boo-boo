import { AuthI } from '../redux/auth/auth-types'
import { authMeTC, authReducer, setAuthUserData, signOutUser } from '../redux/auth/auth-reducer'
import { authAPI } from '../api/api'

const AuthUserResult = {
  uid: '123',
  email: 'test@test.ru',
  displayName: 'name',
}

jest.mock('../api/api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

// @ts-ignore
authAPIMock.authMe.mockReturnValue(Promise.resolve(AuthUserResult))

describe('authReducer', () => {
  it('setAuthUserData', () => {
    const state: AuthI = {
      userId: '',
      userEmail: '',
      userName: '',
    }

    const user = {
      userId: '123',
      userEmail: 'test@test.ru',
      userName: 'name',
    }

    const newState = authReducer(state, setAuthUserData(user))
    expect(newState.userId === '123').toBeTruthy()
    expect(newState.userEmail === 'test@test.ru').toBeTruthy()
    expect(newState.userName === 'name').toBeTruthy()
  })
  it('signOutUser', () => {
    const state: AuthI = {
      userId: '123',
      userEmail: 'test@test.ru',
      userName: 'name',
    }

    const user = {
      userId: '',
      userEmail: '',
      userName: '',
    }

    const newState = authReducer(state, signOutUser(user))
    expect(newState.userId === '').toBeTruthy()
    expect(newState.userEmail === '').toBeTruthy()
    expect(newState.userName === '').toBeTruthy()
  })

  it('authMeTC', async () => {
    const dispatch = jest.fn()
    const thunkAuthMe = authMeTC()
    const getStateMock = jest.fn()

    await thunkAuthMe(dispatch, getStateMock, {})
    // expect(dispatch).toBeCalledTimes(1)
  })
})
