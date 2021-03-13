import React from 'react'
import { renderWithRedux } from './utils/renderWithRedux'
import { App } from '../App'

describe('< App />', () => {
  test('render the App', async () => {
    const { queryByTestId } = renderWithRedux(<App />)
    expect(queryByTestId('application')).toBeTruthy()
  })
})
