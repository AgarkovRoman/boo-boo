import React from 'react'
import { screen } from '@testing-library/react'
import { Projects } from '../pages/components/Projects/Projects'
import { renderWithRedux } from './utils/renderWithRedux'
import { getAllProjects } from '../redux/projects/projects-selectors'

const projects = [
  { name: 'test1', projectId: '1', userId: '54321' },
  { name: 'test2', projectId: '2', userId: '12345' },
]

jest.mock('../redux/projects/projects-selectors', () => ({
  getAllProjects: jest.fn(),
  getActiveProject: jest.fn(),
}))

describe('< Projects/>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('renders the Projects', () => {
      getAllProjects.mockReturnValue(projects)
      const { getByTestId } = renderWithRedux(<Projects />)
      screen.debug()
      expect(getByTestId('all-projects')).toBeTruthy()
    })
  })
})
