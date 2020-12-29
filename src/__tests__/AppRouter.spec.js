import React from 'react'
import { AppRouter } from '../routes/AppRouter'
import { render } from '@testing-library/react'

describe('< AppRouter />', () => {
  it('render the AppRouter', () => {
    const { getByTestId } = render(<AppRouter />)
    expect(getByTestId('application')).toBeTruthy()
    // expect(getByTestId('application').classList.contains('darkmode')).toBeFalsy()
  })
})
