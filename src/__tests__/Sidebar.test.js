import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from '../components/layout/Sidebar/Sidebar'

jest.mock('../context', () => ({
  useSelectedProjectsValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: '🔧 Renovation',
        projectId: '2',
        userId: 'RM6FGvtHAMviaIDJNas',
      },
    ],
  })),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}))

describe('< Sidebar />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the < Sidebar />', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()
    })

    it('changes the active project to Inbox in collated tasks using onClick', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      userEvent.click(queryByTestId('inbox-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    it('changes the active project to Today in collated tasks using onClick', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      userEvent.click(queryByTestId('today-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
    })

    it('changes the active project to Next_7 in collated tasks using onClick', () => {
      const { queryByTestId } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()
      userEvent.click(queryByTestId('next_7-action'))
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()
    })

    it('changes the active project to Inbox in collated tasks using keyDown', () => {
      const { queryByTestId } = render(<Sidebar />)
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

    it('changes the active project to Today in collated tasks using keyDown', () => {
      const { queryByTestId } = render(<Sidebar />)
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

    it('changes the active project to next_7 in collated tasks using keyDown', () => {
      const { queryByTestId } = render(<Sidebar />)
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

    it('hides and shows the sidebar projects using onClick', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy()

      userEvent.click(getByText('Projects'))
      expect(queryByText('Add Project')).toBeFalsy()

      userEvent.click(getByText('Projects'))
      expect(queryByText('Add Project')).toBeTruthy()
    })

    it('hides and shows the sidebar projects using onKeyDown', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />)
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
