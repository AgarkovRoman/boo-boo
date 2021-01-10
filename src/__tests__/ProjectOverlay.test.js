import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectOverlay } from '../components/ProjectOverlay/ProjectOverlay'
import { useProjectsValue } from '../context'

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({
    projects: [{ name: '🔧 Renovation', projectId: '2', userId: 'RM6FGvtHAaIDJNas' }],
  })),
}))

describe('< ProjectOverlay />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the project overlay and calls setShowProjectOverlay using onClick', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

      const { getByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )

      expect(getByTestId('project-overlay')).toBeTruthy()
      userEvent.click(getByTestId('project-overlay-action'))
      expect(setProject).toHaveBeenCalled()
    })

    it('renders the project overlay and calls setShowProjectOverlay using onKeyDown Enter', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

      const { getByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setShowProjectOverlay={setShowProjectOverlay}
          setProject={setProject}
        />
      )

      expect(getByTestId('project-overlay')).toBeTruthy()
      fireEvent.keyDown(getByTestId('project-overlay-action'), {
        key: 'Enter',
        code: 13,
      })
      expect(setProject).toHaveBeenCalled()
    })

    it('renders the project overlay and calls setShowProjectOverlay using wrong onKeyDown', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

      const { getByTestId } = render(
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
    it('does not render the project overlay with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: [],
      }))

      const { getByTestId, queryByTestId } = render(<ProjectOverlay showProjectOverlay />)
      expect(getByTestId('project-overlay')).toBeTruthy()
      expect(queryByTestId('project-overlay-action')).toBeFalsy()
    })
  })
})
