import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Header, SignIn } from '../../components/pages/SignIn/SignIn'
import { FirebaseContext } from '../../context/firebase'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}))

const firebase = {
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve('sign in')),
  })),
}

describe('< Sign In />', () => {
  it('render < Sign In />', async () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignIn>
            <Header />
          </SignIn>
        </FirebaseContext.Provider>
      </BrowserRouter>
    )

    await act(async () => {
      await userEvent.type(getByPlaceholderText('Email'), 'r.agarkov.roman@gmail.com')
      await userEvent.type(getByPlaceholderText('Password'), 'r.agarkov.roman@gmail.com')
      userEvent.click(queryByTestId('sign-in'))
      expect(getByTestId('header')).toBeTruthy()
      screen.debug()
    })
  })
})
