import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTask } from '../components/AddTask/AddTask'
import { renderWithRedux } from './utils/renderWithRedux'
import { getActiveProject } from '../redux/projects/projects-selectors'

jest.mock('', () => ({
  getActiveProject: jest.fn(),
}))

describe('< AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('render the < AddTask />', () => {
      const { getByTestId } = renderWithRedux(<AddTask />)
      expect(getByTestId('add-task-comp')).toBeTruthy()
    })

    test('render the < AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn()
      const { getByTestId } = renderWithRedux(
        <AddTask
          setShowQuickAddTask={setShowQuickAddTask}
          showAddTaskMain
          showQuickAddTask
          showShouldMain={false}
        />
      )
      expect(getByTestId('quick-add-task')).toBeTruthy()
    })

    test('render the < AddTask/> main using onClick', () => {
      const { getByTestId, queryByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task')).toBeTruthy()
      expect(queryByTestId('show-project-overlay')).toBeTruthy()
      expect(queryByTestId('show-task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> main using onKeyDown', () => {
      const { getByTestId, queryByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task')).toBeTruthy()
      expect(queryByTestId('show-project-overlay')).toBeTruthy()
      expect(queryByTestId('show-task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> main using wrong onKeyDown', () => {
      const { getByTestId, queryByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('add-task-main')).toBeFalsy()
      expect(queryByTestId('add-task-content')).toBeFalsy()
      expect(queryByTestId('add-task')).toBeFalsy()
      expect(queryByTestId('show-project-overlay')).toBeFalsy()
      expect(queryByTestId('show-task-date-overlay')).toBeFalsy()
    })

    test('render the < AddTask/> project overlay using onClick', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('show-project-overlay'))
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> project overlay using onKeyDown', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-project-overlay'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> project overlay using wrong onKeyDown', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-project-overlay'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('project-overlay')).toBeFalsy()
    })

    test('render the < AddTask /> date overlay using onClick', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask /> date overlay using Enter onKeyDown', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-task-date-overlay'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask /> date overlay using wrong onKeyDown', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-task-date-overlay'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()
    })

    test('hides the < AddTask /> main when cancel is clicked using onClick', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(getByTestId('add-task-main-cancel'))
      expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    test('hides the < AddTask /> main when cancel is clicked using Enter onKeyDown', () => {
      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask />)

      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()
      // screen.debug()
      // fireEvent.keyDown(getByTestId('add-task-main-cancel'), { key: 'Enter', keyCode: 'Enter' })
      // screen.debug()
      // expect(findByTestId('add-task-main')).toBeFalsy()
    })

    test('hides the < AddTask /> main when cancel is clicked using wrong onKeyDown', () => {
      const { queryByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    test('render the < AddTask /> for quick add task and then click cancel using onClick', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = renderWithRedux(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      userEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('add-task-quick-cancel'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('render the < AddTask /> for quick add task and then click cancel using Enter onKeyDown', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = renderWithRedux(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), { key: 'Enter', keyCode: 'Enter' })
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('render the < AddTask /> for quick add task and then click cancel using wrong onKeyDown', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = renderWithRedux(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), { key: 'a', keyCode: 'KeyA' })
      expect(setShowQuickAddTask).not.toHaveBeenCalled()
    })

    test('renders < AddTask /> and adds a task to TODAY', () => {
      getActiveProject.mockReturnValue('TODAY')
      // useSelectedProjectsValue.mockImplementation(() => ({
      //   selectedProject: 'TODAY',
      // }))
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)

      const { queryByTestId, getByTestId } = renderWithRedux(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()

      userEvent.type(queryByTestId('add-task-content'), 'I am a new task and I am amazing!')
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!')

      userEvent.click(queryByTestId('add-task'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('renders < AddTask /> and adds a task to NEXT_7', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
      }))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId, getByTestId } = renderWithRedux(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()

      userEvent.type(getByTestId('add-task-content'), 'I am a new task and I am amazing!')
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!')

      userEvent.click(getByTestId('add-task'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('renders < AddTask /> and adds a task with a task date of TODAY', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: '1',
      }))

      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showMain />)
      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.type(getByTestId('add-task-content'), 'I am the most amazing task ever!')
      expect(queryByTestId('add-task-content').value).toBe('I am the most amazing task ever!')

      userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      userEvent.click(getByTestId('task-date-today'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(getByTestId('task-date-today'), {
        key: 'a',
        code: 'KeyA',
      })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('task-date-today'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(queryByTestId('add-task'))
    })

    test('renders < AddTask /> and adds a task with a task date of TOMORROW', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: '1',
      }))

      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.type(getByTestId('add-task-content'), 'I am a another task')
      expect(queryByTestId('add-task-content').value).toBe('I am a another task')

      userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      userEvent.click(getByTestId('task-date-tomorrow'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(getByTestId('task-date-tomorrow'), {
        key: 'a',
        code: 'KeyA',
      })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('task-date-tomorrow'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(queryByTestId('add-task'))
    })

    test('renders < AddTask /> and adds a task with a task date of NEXT_7', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: '1',
      }))

      const { queryByTestId, getByTestId } = renderWithRedux(<AddTask showMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.type(getByTestId('add-task-content'), 'I am a another task')
      expect(queryByTestId('add-task-content').value).toBe('I am a another task')

      userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      userEvent.click(getByTestId('task-date-next_7'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(getByTestId('task-date-next_7'), {
        key: 'a',
        code: 'KeyA',
      })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('task-date-next_7'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(queryByTestId('add-task'))
    })
  })
})
