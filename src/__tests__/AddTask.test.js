import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTask } from '../pages/components/AddTask/AddTask'
import { renderWithRedux } from './utils/renderWithRedux'

jest.mock('', () => ({
  getActiveProject: jest.fn(),
}))

describe('< AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('render the < AddTask />', async () => {
      const { getByTestId } = renderWithRedux(<AddTask />)
      await expect(getByTestId('add-task-comp')).toBeTruthy()
    })

    test('render the < AddTask /> quick overlay', async () => {
      const setShowQuickAddTask = jest.fn()
      const { getByTestId } = renderWithRedux(
        <AddTask
          setShowQuickAddTask={setShowQuickAddTask}
          showAddTaskMain
          showQuickAddTask
          showShouldMain={false}
        />
      )
      await expect(getByTestId('quick-add-task')).toBeTruthy()
    })

    test('render the < AddTask/> main using onClick', async () => {
      const { getByTestId, findByTestId, queryByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )
      userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-main')).toBeTruthy()
      expect(await findByTestId('add-task-content')).toBeTruthy()
      expect(await findByTestId('add-task')).toBeTruthy()
      expect(await findByTestId('show-project-overlay')).toBeTruthy()
      expect(await findByTestId('show-task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> main using onKeyDown', async () => {
      const { getByTestId, queryByTestId, findByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )
      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()
      expect(await findByTestId('add-task-content')).toBeTruthy()
      expect(await findByTestId('add-task')).toBeTruthy()
      expect(await findByTestId('show-project-overlay')).toBeTruthy()
      expect(await findByTestId('show-task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> main using wrong onKeyDown', async () => {
      const { getByTestId, queryByTestId } = renderWithRedux(<AddTask showAddTaskMain />)
      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'a', keyCode: 'KeyA' })
      expect(await queryByTestId('add-task-main')).toBeFalsy()
      expect(await queryByTestId('add-task-content')).toBeFalsy()
      expect(await queryByTestId('add-task')).toBeFalsy()
      expect(await queryByTestId('show-project-overlay')).toBeFalsy()
      expect(await queryByTestId('show-task-date-overlay')).toBeFalsy()
    })

    test('render the < AddTask/> project overlay using onClick', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('show-project-overlay'))
      expect(await findByTestId('project-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> project overlay using onKeyDown', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-project-overlay'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('project-overlay')).toBeTruthy()
    })

    test('render the < AddTask/> project overlay using wrong onKeyDown', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-project-overlay'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('project-overlay')).toBeFalsy()
    })

    test('render the < AddTask /> date overlay using onClick', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('show-task-date-overlay'))
      expect(await findByTestId('task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask /> date overlay using Enter onKeyDown', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-task-date-overlay'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('task-date-overlay')).toBeTruthy()
    })

    test('render the < AddTask /> date overlay using wrong onKeyDown', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-task-date-overlay'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()
    })

    test('hides the < AddTask /> main when cancel is clicked using onClick', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showAddTaskMain />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-main')).toBeTruthy()

      userEvent.click(getByTestId('add-task-main-cancel'))
      expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    test('hides the < AddTask /> main when cancel is clicked using Enter onKeyDown', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(<AddTask />)

      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()
      // screen.debug()
      // fireEvent.keyDown(getByTestId('add-task-main-cancel'), { key: 'Enter', keyCode: 'Enter' })
      // screen.debug()
      // expect(findByTestId('add-task-main')).toBeFalsy()
    })

    test('hides the < AddTask /> main when cancel is clicked using wrong onKeyDown', async () => {
      const { queryByTestId, findByTestId } = renderWithRedux(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), { key: 'a', keyCode: 'KeyA' })
      expect(await findByTestId('add-task-main')).toBeTruthy()
    })

    test('render the < AddTask /> for quick add task and then click cancel using onClick', async () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId, findByTestId } = renderWithRedux(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      userEvent.click(queryByTestId('show-main-action'))
      expect(await findByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('add-task-quick-cancel'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('render the < AddTask /> for quick add task and then click cancel using Enter onKeyDown', async () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId, findByTestId } = renderWithRedux(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(await findByTestId('add-task-main')).toBeTruthy()

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

    test('renders < AddTask /> and adds a task to TODAY', async () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)

      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-content')).toBeTruthy()

      userEvent.type(await findByTestId('add-task-content'), 'I am a new task and I am amazing!')
      expect(await queryByTestId('add-task-content').value).toBe(
        'I am a new task and I am amazing!'
      )

      userEvent.click(await findByTestId('add-task'))
      // expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('renders < AddTask /> and adds a task to NEXT_7', async () => {
      const showQuickAddTask = false
      // const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const setShowQuickAddTask = jest.fn()
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      )

      await userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-content')).toBeTruthy()

      await userEvent.type(getByTestId('add-task-content'), 'I am a new task and I am amazing!')
      expect(queryByTestId('add-task-content').value).toEqual('I am a new task and I am amazing!')

      await userEvent.click(await findByTestId('add-task'))
      // expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    test('renders < AddTask /> and adds a task with a task date of TODAY', async () => {
      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(<AddTask showMain />)
      userEvent.click(await findByTestId('show-main-action'))
      expect(await findByTestId('add-task-content')).toBeTruthy()
      expect(await findByTestId('add-task-main')).toBeTruthy()

      await userEvent.type(getByTestId('add-task-content'), 'I am the most amazing task ever!')
      expect(queryByTestId('add-task-content').value).toEqual('I am the most amazing task ever!')

      await userEvent.click(getByTestId('show-task-date-overlay'))
      expect(await findByTestId('task-date-overlay')).toBeTruthy()

      await userEvent.click(getByTestId('task-date-today'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      await userEvent.click(getByTestId('show-task-date-overlay'))
      expect(await findByTestId('task-date-overlay')).toBeTruthy()

      await fireEvent.keyDown(getByTestId('task-date-today'), {
        key: 'a',
        code: 'KeyA',
      })
      expect(await findByTestId('task-date-overlay')).toBeTruthy()

      await fireEvent.keyDown(getByTestId('task-date-today'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      await userEvent.click(await findByTestId('add-task'))
    })

    test('renders < AddTask /> and adds a task with a task date of TOMORROW', async () => {
      // getActiveProject.mockReturnValue('1')

      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(<AddTask showMain />)

      await userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-content')).toBeTruthy()
      expect(await findByTestId('add-task-main')).toBeTruthy()

      await userEvent.type(getByTestId('add-task-content'), 'I am a another task')
      expect(queryByTestId('add-task-content').value).toBe('I am a another task')

      await userEvent.click(getByTestId('show-task-date-overlay'))
      expect(await findByTestId('task-date-overlay')).toBeTruthy()

      await userEvent.click(getByTestId('task-date-tomorrow'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      await userEvent.click(getByTestId('show-task-date-overlay'))
      expect(await findByTestId('task-date-overlay')).toBeTruthy()

      await fireEvent.keyDown(getByTestId('task-date-tomorrow'), {
        key: 'a',
        code: 'KeyA',
      })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      await fireEvent.keyDown(queryByTestId('task-date-tomorrow'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      // userEvent.click(queryByTestId('add-task'))
    })

    test('renders < AddTask /> and adds a task with a task date of NEXT_7', async () => {
      // getActiveProject.mockReturnValue('1')

      const { queryByTestId, findByTestId, getByTestId } = renderWithRedux(<AddTask showMain />)

      await userEvent.click(getByTestId('show-main-action'))
      expect(await findByTestId('add-task-content')).toBeTruthy()
      expect(await findByTestId('add-task-main')).toBeTruthy()

      await userEvent.type(getByTestId('add-task-content'), 'I am a another task')
      expect(queryByTestId('add-task-content').value).toBe('I am a another task')

      await userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      await userEvent.click(getByTestId('task-date-next-week'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      await userEvent.click(getByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      await fireEvent.keyDown(getByTestId('task-date-next-week'), {
        key: 'a',
        code: 'KeyA',
      })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      await fireEvent.keyDown(queryByTestId('task-date-next-week'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      userEvent.click(queryByTestId('add-task'))
    })
  })
})
