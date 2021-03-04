import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../components/UI/Button/Button'

const handleClick = jest.fn()

describe('< Button />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('render Button', () => {
    const { getByTestId } = render(
      <Button onClick={handleClick} color="primary" label="button" dataTestId="testId" />
    )
    expect(getByTestId('testId')).toBeTruthy()
  })

  test('render Button and clicked', () => {
    const { getByTestId } = render(
      <Button onClick={handleClick} color="primary" label="button" dataTestId="testId" />
    )
    expect(getByTestId('testId')).toBeTruthy()
    userEvent.click(getByTestId('testId'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
