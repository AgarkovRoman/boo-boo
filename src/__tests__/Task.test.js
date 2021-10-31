import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Task } from '../pages/components/Task/Task'

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

const isModalDisplay = false
const setIsModalDisplay = jest.fn(() => !isModalDisplay)

describe(' < Task />', () => {
  // afterEach(() => {
  //   jest.clearAllMocks()
  // })

  test('render Task', () => {
    const { getByTestId } = render(<Task id="1232" name="Name" />)
    expect(getByTestId('task')).toBeTruthy()
  })

  test('render Task and onClick on kebab and Modal open', () => {
    const { getByTestId, findByTestId } = render(<Task id="1232" name="Name" />)
    expect(getByTestId('task')).toBeTruthy()
    userEvent.click(getByTestId('task-kebab'))
    expect(findByTestId('small-modal-window')).toBeTruthy()
  })

  test('render Task and keyDown on kebab and Modal open', () => {
    const { getByTestId, findByTestId } = render(<Task id="1232" name="Name" />)
    expect(getByTestId('task')).toBeTruthy()
    fireEvent.keyDown(getByTestId('task-kebab'), {
      key: 'Enter',
      code: 13,
    })
    expect(findByTestId('small-modal-window')).toBeTruthy()
  })

  test('render Task and keyDown on kebab and Modal not open', () => {
    const { getByTestId, queryByTestId } = render(<Task id="1232" name="Name" />)
    expect(getByTestId('task')).toBeTruthy()
    fireEvent.keyDown(getByTestId('task-kebab'), {
      key: 'a',
      code: 'KeyA',
    })
    expect(queryByTestId('small-modal-window')).toBeFalsy()
  })

  test('render Task, onClick on kebab, open Modal, onClick on delete', () => {
    const { getByTestId, findByTestId, queryByTestId } = render(<Task id="1232" name="Name" />)
    expect(getByTestId('task')).toBeTruthy()
    userEvent.click(getByTestId('task-kebab'))
    expect(findByTestId('small-modal-window')).toBeTruthy()
    userEvent.click(getByTestId('small-modal-window-delete'))
    expect(queryByTestId('small-modal-window')).toBeFalsy()
  })

  test('render Task, onClick on kebab, open Modal, onClick on cancel', () => {
    const { getByTestId, findByTestId, queryByTestId } = render(<Task id="1232" name="Name" />)
    expect(getByTestId('task')).toBeTruthy()
    userEvent.click(getByTestId('task-kebab'))
    expect(findByTestId('small-modal-window')).toBeTruthy()
    userEvent.click(getByTestId('small-modal-window-cancel'))
    expect(queryByTestId('small-modal-window')).toBeFalsy()
  })
})
