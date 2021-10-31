import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SmallModalWindow } from '../common/UI/SmallModalWindow/SmallModalWindow'

const deleteTask = jest.fn()
const onClose = jest.fn()

describe('< SmallModalWindow />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('render SmallModalWindow ', () => {
    const { getByTestId } = render(
      <SmallModalWindow description="description" deleteTask={deleteTask} onClose={onClose} />
    )
    expect(getByTestId('small-modal-window')).toBeTruthy()
  })

  test('render SmallModalWindow and Delete clicked', () => {
    const { getByTestId } = render(
      <SmallModalWindow description="description" deleteTask={deleteTask} onClose={onClose} />
    )
    expect(getByTestId('small-modal-window')).toBeTruthy()
    userEvent.click(getByTestId('small-modal-window-delete'))
    expect(deleteTask).toBeCalledTimes(1)
  })

  test('render SmallModalWindow and Cancel clicked', () => {
    const { getByTestId } = render(
      <SmallModalWindow description="description" deleteTask={deleteTask} onClose={onClose} />
    )
    expect(getByTestId('small-modal-window')).toBeTruthy()
    userEvent.click(getByTestId('small-modal-window-cancel'))
    expect(onClose).toBeCalledTimes(1)
  })
})
