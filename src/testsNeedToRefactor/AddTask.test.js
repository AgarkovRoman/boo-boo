import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTask } from '../components/AddTask/AddTask'

// jest.mock('../context', () => ({
//   useSelectedProjectsValue: jest.fn(() => ({ selectedProject: '1' })),
//   useProjectsValue: jest.fn(() => ({ projects: [] })),
// }))

// jest.mock('../firebase', () => ({
//   firebase: {
//     firestore: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         add: jest.fn(() => Promise.resolve('Never mockk')),
//       })),
//     })),
//   },
// }))

describe('< AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('render the < AddTask />', () => {
      const { getByTestId } = render(<AddTask />)
      expect(getByTestId('add-task-comp')).toBeTruthy()
    })

    it('render the < AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn()
      const { getByTestId } = render(
        <AddTask
          setShowQuickAddTask={setShowQuickAddTask}
          showAddTaskMain
          showQuickAddTask
          showShouldMain={false}
        />
      )
      expect(getByTestId('quick-add-task')).toBeTruthy()
    })

    it('render the < AddTask/> main using onClick', () => {
      const { getByTestId, queryByTestId } = render(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task')).toBeTruthy()
      expect(queryByTestId('show-project-overlay')).toBeTruthy()
      expect(queryByTestId('show-task-date-overlay')).toBeTruthy()
    })

    it('render the < AddTask/> main using onKeyDown', () => {
      const { getByTestId, queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task')).toBeTruthy()
      expect(queryByTestId('show-project-overlay')).toBeTruthy()
      expect(queryByTestId('show-task-date-overlay')).toBeTruthy()
    })

    it('render the < AddTask/> main using wrong onKeyDown', () => {
      const { getByTestId, queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('add-task-main')).toBeFalsy()
      expect(queryByTestId('add-task-content')).toBeFalsy()
      expect(queryByTestId('add-task')).toBeFalsy()
      expect(queryByTestId('show-project-overlay')).toBeFalsy()
      expect(queryByTestId('show-task-date-overlay')).toBeFalsy()
    })

    it('render the < AddTask/> project overlay using onClick', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('show-project-overlay'))
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })

    it('render the < AddTask/> project overlay using onKeyDown', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-project-overlay'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })

    it('render the < AddTask/> project overlay using wrong onKeyDown', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-project-overlay'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('project-overlay')).toBeFalsy()
    })

    it('render the < AddTask /> date overlay using onClick', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()
    })

    it('render the < AddTask /> date overlay using Enter onKeyDown', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-task-date-overlay'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('task-date-overlay')).toBeTruthy()
    })

    it('render the < AddTask /> date overlay using wrong onKeyDown', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(getByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(getByTestId('show-task-date-overlay'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('task-date-overlay')).toBeFalsy()
    })

    it('hides the < AddTask /> main when cancel is clicked using onClick', () => {
      const { queryByTestId, getByTestId } = render(<AddTask showAddTaskMain />)

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(getByTestId('add-task-main-cancel'))
      expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    it('hides the < AddTask /> main when cancel is clicked using Enter onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    it('hides the < AddTask /> main when cancel is clicked using wrong onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), { key: 'a', keyCode: 'KeyA' })
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('render the < AddTask /> for quick add task and then click cancel using onClick', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      userEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      userEvent.click(queryByTestId('add-task-quick-cancel'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    it('render the < AddTask /> for quick add task and then click cancel using Enter onKeyDown', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), { key: 'Enter', keyCode: 'Enter' })
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    it('render the < AddTask /> for quick add task and then click cancel using wrong onKeyDown', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )
      fireEvent.keyDown(queryByTestId('show-main-action'), { key: 'Enter', keyCode: 'Enter' })
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), { key: 'a', keyCode: 'KeyA' })
      expect(setShowQuickAddTask).not.toHaveBeenCalled()
    })

    it('renders < AddTask /> and adds a task to TODAY', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }))
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)

      const { queryByTestId, getByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()

      userEvent.type(queryByTestId('add-task-content'), 'I am a new task and I am amazing!')
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!')

      userEvent.click(queryByTestId('add-task'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    it('renders < AddTask /> and adds a task to NEXT_7', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
      }))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId, getByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      )

      userEvent.click(getByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()

      userEvent.type(getByTestId('add-task-content'), 'I am a new task and I am amazing!')
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!')

      userEvent.click(getByTestId('add-task'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    it('renders < AddTask /> and adds a task with a task date of TODAY', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: '1',
      }))

      const { queryByTestId, getByTestId } = render(<AddTask showMain />)
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

    it('renders < AddTask /> and adds a task with a task date of TOMORROW', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: '1',
      }))

      const { queryByTestId, getByTestId } = render(<AddTask showMain />)

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

    it('renders < AddTask /> and adds a task with a task date of NEXT_7', () => {
      useSelectedProjectsValue.mockImplementation(() => ({
        selectedProject: '1',
      }))

      const { queryByTestId, getByTestId } = render(<AddTask showMain />)

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
