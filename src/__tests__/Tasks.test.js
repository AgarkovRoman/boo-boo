import React from 'react'
import { Tasks } from '../components/Tasks/Tasks'
import { getAllTasks } from '../redux/tasks/tasks-selectors'
import { getActiveProject, getAllProjects } from '../redux/projects/projects-selectors'
import { renderWithRedux } from './utils/renderWithRedux'

const tasks = [
  {
    id: '0HTGB1k3BXUYVh6nn2Vy',
    archived: false,
    date: '15/11/2020',
    projectId: '1',
    task: 'задача на завтра в ворк',
    userId: 'RM6FGvtHAMviaIDJNas',
  },
]
const projects = [
  { name: 'test1', projectId: '1', userId: '54321' },
  { name: 'test2', projectId: '2', userId: '12345' },
]

jest.mock('../redux/tasks/tasks-selectors', () => ({
  getAllTasks: jest.fn(),
}))

jest.mock('../redux/projects/projects-selectors', () => ({
  getActiveProject: jest.fn(),
  getAllProjects: jest.fn(),
}))

describe('< Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders a Tasks', () => {
    getActiveProject.mockReturnValue('INBOX')
    getAllProjects.mockReturnValue(projects)
    getAllTasks.mockReturnValue(tasks)

    const { getByTestId, findByTestId } = renderWithRedux(<Tasks />)
    expect(findByTestId('tasks')).toBeTruthy()
    expect(getByTestId('project-name').textContent).toBe('Inbox')
  })

  test('render a Tasks without any tasks ', () => {
    getActiveProject.mockReturnValue('INBOX')
    getAllProjects.mockReturnValue(projects)
    getAllTasks.mockReturnValue([])

    const { getByTestId } = renderWithRedux(<Tasks />)
    expect(getByTestId('tasks')).toBeTruthy()
    expect(getByTestId('project-name').textContent).toBe('Inbox')
    expect(getByTestId('task-not-found').textContent).toBe('All tasks are done! Nice work!')
  })

  test('renders a Tasks with a project title', () => {
    getActiveProject.mockReturnValue('1')
    getAllProjects.mockReturnValue(projects)
    getAllTasks.mockReturnValue(tasks)

    const { getByTestId } = renderWithRedux(<Tasks />)
    expect(getByTestId('tasks')).toBeTruthy()
    expect(getByTestId('project-name').textContent).toBe('test1')
  })
})
