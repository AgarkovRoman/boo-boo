import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { Header } from '../components/layout/Header/Header'
import { FirebaseContext } from '../context/firebase'

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      signOut: jest.fn(() => Promise.resolve('I am resolved!')),
      // catch: jest.fn((error) => Promise.reject(error)),
    })),
  },
}))

const firebase = {
  auth: jest.fn(() => ({
    signOut: jest.fn(() => Promise.resolve('sign out')),
  })),
}

jest.mock('../context', () => ({
  useSelectedProjectsValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}))

describe('< Header />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the Header component', () => {
      const { getByTestId, queryByTestId } = render(
        <BrowserRouter>
          <FirebaseContext.Provider value={{ firebase }}>
            <Header />
          </FirebaseContext.Provider>
        </BrowserRouter>
      )
      expect(queryByTestId('header')).toBeTruthy()
    })

    it('renders the Header component and activates dark mode using onClick', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)
      const { getByTestId, queryByTestId } = render(
        <BrowserRouter>
          <FirebaseContext.Provider value={{ firebase }}>
            <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          </FirebaseContext.Provider>
        </BrowserRouter>
      )

      expect(getByTestId('header')).toBeTruthy()
      userEvent.click(queryByTestId('dark-mode-action'))
      expect(setDarkMode).toHaveBeenCalled()
    })

    it('renders the Header component and set quick add task to true using onClick', () => {
      const darkMode = false

      const { queryByTestId } = render(
        <BrowserRouter>
          <FirebaseContext.Provider value={{ firebase }}>
            <Header darkMode={darkMode} />
          </FirebaseContext.Provider>
        </BrowserRouter>
      )
      expect(queryByTestId('header')).toBeTruthy()

      userEvent.click(queryByTestId('quick-add-task-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the Header component and sign-out using onClick', () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <FirebaseContext.Provider value={{ firebase }}>
            <Header />
          </FirebaseContext.Provider>
        </BrowserRouter>
      )
      expect(queryByTestId('header')).toBeTruthy()
      userEvent.click(queryByTestId('sign-out'))
    })

    it('renders the Header component and sign-out reject', () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <FirebaseContext.Provider value={{ firebase }}>
            <Header />
          </FirebaseContext.Provider>
        </BrowserRouter>
      )
      expect(queryByTestId('header')).toBeTruthy()
      userEvent.click(queryByTestId('sign-out'))
    })
  })
})
