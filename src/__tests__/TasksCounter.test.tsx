import React from 'react'
import { render } from '@testing-library/react'
import { TasksCounter } from '../components/UI/TasksCounter/TasksCounter'

describe('< TasksCounter />', () => {
  test('render counter with count > 0', () => {
    const { getByTestId } = render(<TasksCounter count={1} />)
    expect(getByTestId('task-counter')).toBeTruthy()
  })

  test(' not render counter with count = 0', () => {
    const { queryByTestId } = render(<TasksCounter count={0} />)
    expect(queryByTestId('task-counter')).toBeFalsy()
  })
})
