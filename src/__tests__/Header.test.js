import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../components/layout/Header/Header'

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

describe('< Header />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the Header component', () => {
      const { queryByTestId } = render(<Header />)
      expect(queryByTestId('header')).toBeTruthy()
    })

    it('renders the Header component and set quick add task to true using onClick', () => {
      const { queryByTestId } = render(<Header />)
      expect(queryByTestId('header')).toBeTruthy()
      userEvent.click(queryByTestId('quick-add-task-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the Header component and sign-out using onClick', () => {
      const { queryByTestId } = render(<Header />)
      expect(queryByTestId('header')).toBeTruthy()
      userEvent.click(queryByTestId('sign-out'))
    })

    it('renders the Header component and sign-out reject', () => {
      const { queryByTestId } = render(<Header />)
      expect(queryByTestId('header')).toBeTruthy()
      userEvent.click(queryByTestId('sign-out'))
    })

    // it('renders the Header component and activates dark mode using onClick', () => {
    //   const darkMode = false
    //   const setDarkMode = jest.fn(() => !darkMode)
    //   const { getByTestId, queryByTestId } = render(
    //     <BrowserRouter>
    //         <Header setDarkMode={setDarkMode} darkMode={darkMode} />
    //     </BrowserRouter>
    //   )
    //
    //   expect(getByTestId('header')).toBeTruthy()
    //   userEvent.click(queryByTestId('dark-mode-action'))
    //   expect(setDarkMode).toHaveBeenCalled()
    // })
  })
})
