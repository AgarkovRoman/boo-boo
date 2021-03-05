import React from 'react'
import { render, screen } from '@testing-library/react'
import { Projects } from '../components/Projects/Projects'

const projects = [
  { name: 'test1', projectId: '1', userId: '54321' },
  { name: 'test2', projectId: '2', userId: '12345' },
]

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
}))

jest.mock('../redux/projects/projects-selectors', () => ({
  getAllProjects: jest.fn().mockReturnValue(projects),
}))

describe('< Projects/>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('renders the Projects', () => {
      const { getByTestId } = render(<Projects />)
      expect(getByTestId('all-projects')).toBeTruthy()
    })

    // it('renders the projects and selects an active project using onClick', () => {
    //   const { getByTestId } = render(<Projects />)
    //   expect(getByTestId('project-action')).toBeTruthy()
    //   userEvent.click(getByTestId('project-action'))
    //   expect(getByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    // })
    //
    // it('renders the projects and selects an active project using onKeyDown', () => {
    //   const { getByTestId, queryByTestId } = render(<Projects activeValue="0" />)
    //   expect(getByTestId('project-action')).toBeTruthy()
    //   fireEvent.keyDown(getByTestId('project-action'), {
    //     key: 'a',
    //     code: 65,
    //   })
    //   expect(queryByTestId('project-action-parent').classList.contains('active')).toBeFalsy()
    //
    //   fireEvent.keyDown(getByTestId('project-action'), {
    //     key: 'Enter',
    //     code: 13,
    //   })
    //   expect(getByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    // })

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
