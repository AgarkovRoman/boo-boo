import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { SignIn } from '../../pages/SignIn/SignIn'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

describe('< Sign In />', () => {
  it('render < Sign In />', async () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )

    await act(async () => {
      await userEvent.type(getByPlaceholderText('Email'), 'r.agarkov.roman@gmail.com')
      await userEvent.type(getByPlaceholderText('Password'), 'r.agarkov.roman@gmail.com')
      userEvent.click(queryByTestId('sign-in'))
      expect(getByTestId('header')).toBeTruthy()
    })
  })
})
