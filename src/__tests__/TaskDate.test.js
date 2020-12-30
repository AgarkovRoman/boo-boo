import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskDate } from '../components/TaskDate/TaskDate'

const setShowTaskDate = jest.fn()
const setTaskDate = jest.fn()
const showTaskDate = true

describe('< TaskDate />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render TaskDate', () => {
    const { getByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
  })

  it('render TaskDate and using click on Today', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    userEvent.click(queryByTestId('task-date-today'))
    expect(setShowTaskDate).toHaveBeenCalledTimes(1)
    expect(setTaskDate).toHaveBeenCalledTimes(1)
  })

  it('render TaskDate and using keyDown Enter on Today', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    fireEvent.keyDown(queryByTestId('task-date-today'), { key: 'Enter', code: 'Enter' })
    expect(setShowTaskDate).toHaveBeenCalledTimes(1)
    expect(setTaskDate).toHaveBeenCalledTimes(1)
  })

  it('render TaskDate and using WRONG keyDown on Today', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    fireEvent.keyDown(queryByTestId('task-date-today'), { key: 'a', code: 'KeyA' })
    expect(setShowTaskDate).toHaveBeenCalledTimes(0)
    expect(setTaskDate).toHaveBeenCalledTimes(0)
  })

  it('render TaskDate and using click on Tomorrow', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    userEvent.click(queryByTestId('task-date-tomorrow'))
    expect(setShowTaskDate).toHaveBeenCalledTimes(1)
    expect(setTaskDate).toHaveBeenCalledTimes(1)
  })

  it('render TaskDate and using keyDown Enter on Tomorrow', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    fireEvent.keyDown(queryByTestId('task-date-tomorrow'), { key: 'Enter', code: 'Enter' })
    expect(setShowTaskDate).toHaveBeenCalledTimes(1)
    expect(setTaskDate).toHaveBeenCalledTimes(1)
  })

  it('render TaskDate and using WRONG keyDown on Tomorrow', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    fireEvent.keyDown(queryByTestId('task-date-tomorrow'), { key: 'a', code: 'KeyA' })
    expect(setShowTaskDate).toHaveBeenCalledTimes(0)
    expect(setTaskDate).toHaveBeenCalledTimes(0)
  })

  it('render TaskDate and using click on Next Week', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    userEvent.click(queryByTestId('task-date-next-week'))
    expect(setShowTaskDate).toHaveBeenCalledTimes(1)
    expect(setTaskDate).toHaveBeenCalledTimes(1)
  })

  it('render TaskDate and using keyDown Enter on Next Week', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    fireEvent.keyDown(queryByTestId('task-date-next-week'), { key: 'Enter', code: 'Enter' })
    expect(setShowTaskDate).toHaveBeenCalledTimes(1)
    expect(setTaskDate).toHaveBeenCalledTimes(1)
  })

  it('render TaskDate and using WRONG keyDown on Next Week', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskDate
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
        showTaskDate={showTaskDate}
      />
    )
    expect(getByTestId('task-date-overlay')).toBeTruthy()
    fireEvent.keyDown(queryByTestId('task-date-next-week'), { key: 'a', code: 'KeyA' })
    expect(setShowTaskDate).toHaveBeenCalledTimes(0)
    expect(setTaskDate).toHaveBeenCalledTimes(0)
  })
})
