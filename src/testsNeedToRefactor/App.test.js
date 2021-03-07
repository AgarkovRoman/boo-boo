import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { App } from '../App'

describe('< App />', () => {
  it('render the application', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(getByTestId('application')).toBeTruthy()
    expect(getByTestId('application').classList.contains('darkmode')).toBeFalsy()
  })
  it('render the application using dark mode', () => {
    const { getByTestId } = render(<App darkModeDefault />)
    expect(getByTestId('application')).toBeTruthy()
    expect(getByTestId('application').classList.contains('darkmode')).toBeTruthy()
  })
})
