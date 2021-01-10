import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../App'

describe('<App/>', () => {
  it('render the application', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('application')).toBeTruthy()
    expect(getByTestId('application').classList.contains('darkmode')).toBeFalsy()

    screen.debug()
  })
  it('render the application using dark mode', () => {
    const { getByTestId } = render(<App darkModeDefault />)
    expect(getByTestId('application')).toBeTruthy()
    expect(getByTestId('application').classList.contains('darkmode')).toBeTruthy()
  })
})
