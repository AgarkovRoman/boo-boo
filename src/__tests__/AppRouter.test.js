import React from 'react'
import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { AppRouter } from '../routes/AppRouter'
import { getUser } from '../helpers/helpers'

const user = {
  userId: '12323131231',
  userEmail: 'test@test.ru',
  userName: 'Name',
}

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation((fn) => fn()),
}))

jest.mock('../redux/auth/auth-selectors', () => ({
  ...jest.requireActual('../redux/auth/auth-selectors'),
  getUser: jest.fn().mockReturnValue(user),
}))

describe('< AppRouter />', () => {
  // const mockStore = configureStore()

  // it('render the AppRouter', async () => {
  //   // Initialize mockStore with empty state
  //   const initialState = {}
  //   const store = mockStore(initialState)
  //
  //   const { queryByTestId } = render(
  //     <Provider store={store}>
  //       <AppRouter />
  //     </Provider>
  //   )
  //
  //   expect(queryByTestId('application')).toBeTruthy()
  //   // expect(getByTestId('application').classList.contains('darkmode')).toBeFalsy()
  // })
  test('render the AppRouter', async () => {
    const { queryByTestId } = render(<AppRouter />)
    screen.debug()
    expect(queryByTestId('application')).toBeTruthy()
  })
})
