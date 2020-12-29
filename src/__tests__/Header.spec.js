import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Header } from '../components/layout/Header/Header'

jest.mock('../context', () => ({
  useSelectedProjectsValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}))

describe('<Header />', () => {
  describe('Success', () => {
    it('renders the header component', () => {
      const { getByTestId } = render(<Header />)
      expect(getByTestId('header')).toBeTruthy()
    })

    it('renders the header component and activates dark mode using onClick', () => {
      const darkMode = false
      const setDarkMode = jest.fn(() => !darkMode)

      const { queryByTestId } = render(<Header darkMode={darkMode} setDarkMode={setDarkMode} />)
      expect(queryByTestId('header')).toBeTruthy()

      fireEvent.click(queryByTestId('dark-mode-action'))
      expect(setDarkMode).toHaveBeenCalledWith(true)
    })

    it('renders the header component and set quick add task to true using onClick', () => {
      const darkMode = false

      const { queryByTestId } = render(<Header darkMode={darkMode} />)
      expect(queryByTestId('header')).toBeTruthy()

      fireEvent.click(queryByTestId('quick-add-task-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })
  })
})
