import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { SignUp } from '../../components/pages/SignUp/SignUp'
import { FirebaseContext } from '../../context/firebase'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

const firebase = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve('sign up')),
  })),
}

describe('< SignUp />', () => {
  it('render < SignUp />', async () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </BrowserRouter>
    )

    await act(async () => {
      await userEvent.type(getByPlaceholderText('Name'), 'Roman')
      await userEvent.type(getByPlaceholderText('Email'), 'r.agarkov.roman@gmail.com')
      await userEvent.type(getByPlaceholderText('Password'), 'r.agarkov.roman@gmail.com')
      userEvent.click(queryByTestId('sign-up'))
    })
  })
})
