import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppRouter } from '../routes/AppRouter'
import { getUser } from '../redux/auth/auth-selectors'
import { renderWithRedux } from './utils/renderWithRedux'

const user = {
  userId: '12323131231',
  userEmail: 'test@test.ru',
  userName: 'Name',
}

jest.mock('../redux/auth/auth-selectors', () => ({
  getUser: jest.fn(),
}))

describe('< AppRouter />', () => {
  test('render the AppRouter', async () => {
    getUser.mockReturnValue(user)
    const { queryByTestId } = renderWithRedux(<AppRouter />)
    expect(queryByTestId('application')).toBeTruthy()
  })
})
