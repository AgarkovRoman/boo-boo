import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from '../components/layout/Sidebar/Sidebar'
import { renderWithRedux } from './utils/renderWithRedux'

const userId = 'RM6FGvtHAMviaIDJNas'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}))

describe('< Sidebar />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('renders the < Sidebar />', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
    })

    test('changes the active project to Inbox in collated tasks using onClick', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      userEvent.click(queryByTestId('inbox-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    test('changes the active project to Today in collated tasks using onClick', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      userEvent.click(queryByTestId('today-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    test('changes the active project to Next_7 in collated tasks using onClick', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      userEvent.click(queryByTestId('next_7-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()
    })

    test('changes the active project to Inbox in collated tasks using keyDown', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      fireEvent.keyDown(queryByTestId('inbox-action'), {
        key: 'a',
        code: 65,
      })

      fireEvent.keyDown(queryByTestId('inbox-action'), {
        key: 'Enter',
        code: 13,
      })

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    test('changes the active project to Today in collated tasks using keyDown', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      fireEvent.keyDown(queryByTestId('today-action'), {
        key: 'a',
        code: 65,
      })

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()

      fireEvent.keyDown(queryByTestId('today-action'), {
        key: 'Enter',
        code: 13,
      })

      expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    test('changes the active project to next_7 in collated tasks using keyDown', () => {
      const { queryByTestId } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      fireEvent.keyDown(queryByTestId('next_7-action'), {
        key: 'a',
        code: 65,
      })

      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('next_7-action'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
    })

    test('hides and shows the sidebar projects using onClick', () => {
      const { queryByTestId, queryByText, getByText } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      userEvent.click(getByText('Projects'))
      expect(queryByText('Add Project')).toBeFalsy()

      userEvent.click(getByText('Projects'))
      expect(queryByText('Add Project')).toBeTruthy()
    })

    test('hides and shows the sidebar projects using onKeyDown', () => {
      const { queryByTestId, queryByText, getByText } = renderWithRedux(<Sidebar userId={userId} />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      fireEvent.keyDown(getByText('Projects'), {
        key: 'a',
        code: 65,
      })
      expect(queryByText('Add Project')).toBeTruthy()

      fireEvent.keyDown(getByText('Projects'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByText('Add Project')).toBeFalsy()

      fireEvent.keyDown(getByText('Projects'), {
        key: 'a',
        code: 65,
      })
      expect(queryByText('Add Project')).toBeFalsy()

      fireEvent.keyDown(getByText('Projects'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByText('Add Project')).toBeTruthy()
    })
  })
})
