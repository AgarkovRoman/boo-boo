import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Projects } from '../components/Projects/Projects'
import { useProjectsValue } from '../context'

jest.mock('../context', () => ({
  useSelectedProjectsValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [{ name: 'Renovation', projectId: '2', userId: 'RM6FGvtHAMviaIDJNas' }],
  })),
}))

describe('< Projects/>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the projects', () => {
      const { getAllByTestId } = render(<Projects />)
      expect(getAllByTestId('project-action')).toBeTruthy()
    })

    it('renders the projects and selects an active project using onClick', () => {
      const { getByTestId } = render(<Projects />)
      expect(getByTestId('project-action')).toBeTruthy()
      userEvent.click(getByTestId('project-action'))
      expect(getByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    })

    it('renders the projects and selects an active project using onKeyDown', () => {
      const { getByTestId, queryByTestId } = render(<Projects activeValue="0" />)
      expect(getByTestId('project-action')).toBeTruthy()
      fireEvent.keyDown(getByTestId('project-action'), {
        key: 'a',
        code: 65,
      })
      expect(queryByTestId('project-action-parent').classList.contains('active')).toBeFalsy()

      fireEvent.keyDown(getByTestId('project-action'), {
        key: 'Enter',
        code: 13,
      })
      expect(getByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    })

    // it('renders the projects with no active value', () => {
    //     const {queryByTestId} = render(<Projects activeValue="0"/>);
    //     expect(queryByTestId('project-action')).toBeTruthy();
    //
    //     fireEvent.keyDown(queryByTestId('project-action'), {
    //         key: 'a',
    //         code: 65,
    //     });
    //     expect(
    //         queryByTestId('project-action-parent').classList.contains('active')
    //     ).toBeFalsy();
    //
    //     fireEvent.keyDown(queryByTestId('project-action'), {
    //         key: 'Enter',
    //         code: 13,
    //     });
    //     expect(
    //         queryByTestId('project-action-parent').classList.contains('active')
    //     ).toBeTruthy();
    //
    //     screen.debug()
    // });
  })
})
