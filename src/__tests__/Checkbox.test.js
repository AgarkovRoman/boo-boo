import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../components/UI/Checkbox/Checkbox'
import { renderWithRedux } from './utils/renderWithRedux'

jest.mock('../redux/tasks/tasks-reducer', () => ({
  archiveTaskTC: () => jest.fn(),
}))

describe('< Checkbox />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
  describe('Success', async () => {
    test('render the task checkbox', () => {
      const { getByTestId } = renderWithRedux(<Checkbox id="1" taskDesc="Finish this app" />)
      expect(getByTestId('checkbox-action')).toBeTruthy()
    })
    test('render the task checkbox and accepts a onClick', async () => {
      const { getByTestId } = renderWithRedux(<Checkbox id="1" taskDesc="Finish this app" />)
      expect(getByTestId('checkbox-action')).toBeTruthy()
      userEvent.click(getByTestId('checkbox-action'))
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
  })
})
