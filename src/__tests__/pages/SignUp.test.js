import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { SignUp } from '../../pages/SignUp/SignUp'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

describe('< SignUp />', () => {
  it('render < SignUp />', async () => {
    const { queryByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <SignUp />
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
