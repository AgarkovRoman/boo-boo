import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectOverlay } from '../pages/components/ProjectOverlay/ProjectOverlay'
import { getAllProjects } from '../redux/projects/projects-selectors'
import { renderWithRedux } from './utils/renderWithRedux'

const projects = [{ name: 'Renovation', projectId: '2', userId: 'RM6FGvtHAaIDJNas' }]

jest.mock('../redux/projects/projects-selectors', () => ({
  getAllProjects: jest.fn(),
}))

describe('< ProjectOverlay />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('renders the project overlay and calls setShowProjectOverlay using onClick', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)
      getAllProjects.mockReturnValue(projects)
      const { getByTestId, findByTestId } = renderWithRedux(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )
      expect(findByTestId('project-overlay')).toBeTruthy()
      userEvent.click(getByTestId('project-overlay-action'))
      expect(setProject).toHaveBeenCalled()
    })

    test('renders the project overlay and calls setShowProjectOverlay using onKeyDown Enter', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)
      getAllProjects.mockReturnValue(projects)

      const { getByTestId, findByTestId } = renderWithRedux(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )

      expect(findByTestId('project-overlay')).toBeTruthy()
      fireEvent.keyDown(getByTestId('project-overlay-action'), {
        key: 'Enter',
        code: 13,
      })
      expect(setProject).toHaveBeenCalled()
    })

    test('renders the project overlay and calls setShowProjectOverlay using wrong onKeyDown', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)
      getAllProjects.mockReturnValue(projects)

      const { getByTestId } = renderWithRedux(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )

      expect(getByTestId('project-overlay')).toBeTruthy()
      expect(getByTestId('project-overlay-action')).toBeTruthy()
      fireEvent.keyDown(getByTestId('project-overlay-action'), { key: 'a', code: 'KeyA' })
      expect(setProject).not.toHaveBeenCalled()
    })
  })

  describe('Failure', () => {
    test('does not render the project overlay with any projects', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

      getAllProjects.mockImplementation(() => [])
      const { getByTestId, queryByTestId } = renderWithRedux(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )
      expect(getByTestId('project-overlay')).toBeTruthy()
      expect(queryByTestId('project-overlay-action')).toBeFalsy()
    })
  })
})
