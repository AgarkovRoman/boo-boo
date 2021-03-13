import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../components/UI/Checkbox/Checkbox'
import { renderWithRedux } from './utils/renderWithRedux'
import { archiveTaskTC } from '../redux/tasks/tasks-reducer'

jest.mock('../redux/tasks/tasks-reducer', () => ({
  archiveTaskTC: () => jest.fn(),
}))

jest.useFakeTimers()

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn((fn) => fn()),
//   useDispatch: () => jest.fn(),
// }))

describe('< Checkbox />', () => {
  describe('Success', () => {
    test('render the task checkbox', () => {
      const { getByTestId } = renderWithRedux(<Checkbox id="1" taskDesc="Finish this app" />)
      expect(getByTestId('checkbox-action')).toBeTruthy()
    })
    test('render the task checkbox and accepts a onClick', () => {
      const { getByTestId } = renderWithRedux(<Checkbox id="1" taskDesc="Finish this app" />)
      expect(getByTestId('checkbox-action')).toBeTruthy()
      userEvent.click(getByTestId('checkbox-action'))
      // expect(setTimeout).toHaveBeenCalledTimes(2)
      // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300)
      // expect(archiveTaskTC('1')).toBeCalledTimes(1)
    })
    test('render the task checkbox and accepts a Enter onKeyDown', () => {
      const { getByTestId } = renderWithRedux(<Checkbox id="1" taskDesc="Finish this app" />)
      expect(getByTestId('checkbox-action')).toBeTruthy()
      fireEvent.keyDown(getByTestId('checkbox-action'), { key: 'Enter', code: 'Enter' })
    })
    test('render the task checkbox and accepts a any onKeyDown', () => {
      const { getByTestId } = renderWithRedux(<Checkbox id="1" taskDesc="Finish this app" />)
      expect(getByTestId('checkbox-action')).toBeTruthy()
      fireEvent.keyDown(getByTestId('checkbox-action'), { key: 'a', code: 'KeyA' })
    })
    test('render the task checkbox and hover it for animation', () => {
      const { getByTestId, queryByTestId } = renderWithRedux(
        <Checkbox id="1" taskDesc="Finish this app" />
      )
      expect(queryByTestId('checkbox-icon')).toBeFalsy()
      fireEvent.mouseEnter(queryByTestId('checkbox-circle'))
      expect(queryByTestId('checkbox-icon')).toBeTruthy()
      fireEvent.mouseLeave(queryByTestId('checkbox-circle'))
      expect(queryByTestId('checkbox-icon')).toBeFalsy()
      fireEvent.mouseOver(queryByTestId('checkbox-circle'))
      expect(queryByTestId('checkbox-icon')).toBeTruthy()
    })
    // test('handleArchiveTask', () => {
    //   expect(handleArchiveTask('1234'))
    // })
  })
})
