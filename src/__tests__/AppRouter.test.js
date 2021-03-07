import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { AppRouter } from '../routes/AppRouter'
import { FirebaseContext } from '../context/firebase'

// const firebase = {
//   auth: jest.fn(() => ({
//     onAuthStateChanged: jest.fn(() => Promise.resolve('sign in')),
//   })),
// }

const firebase = {
  auth: jest.fn(() => ({
    currentUser: { displayName: 'Roman', email: 'Roman@gmail.com' },
    signOut: jest.fn(() => Promise.resolve('I am signed out!')),
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve('I get content!')),
      add: jest.fn(() => Promise.resolve('I add content!')),
    })),
  })),
}

// jest.mock('../hooks', () => ({
//   useAuthListener: jest.fn(() => ({ user: {} })),
// }))

describe('< AppRouter />', () => {
  const mockStore = configureStore()

  it('render the AppRouter', async () => {
    // Initialize mockStore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    const { queryByTestId } = render(
      <Provider store={store}>
        <FirebaseContext.Provider value={{ firebase }}>
          <AppRouter />
        </FirebaseContext.Provider>
      </Provider>
    )

    expect(queryByTestId('application')).toBeTruthy()
    // expect(getByTestId('application').classList.contains('darkmode')).toBeFalsy()
  })
})
