import React from 'react'
import { BooBoo } from '../../components/pages/BooBoo/BooBoo'
import { renderWithRedux } from '../utils/renderWithRedux'

describe(' < BooBoo />', () => {
  test('render BooBoo page', () => {
    const { getByTestId } = renderWithRedux(<BooBoo userId="123" />)
    expect(getByTestId('header')).toBeTruthy()
    expect(getByTestId('content')).toBeTruthy()
  })
})
