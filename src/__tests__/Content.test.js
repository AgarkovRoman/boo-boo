import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Content } from '../pages/components/Content/Content'
import { renderWithRedux } from './utils/renderWithRedux'

describe('< Content />', () => {
  it('render Content', () => {
    const { getByTestId } = renderWithRedux(<Content userId="124124" />)
    expect(getByTestId('content')).toBeTruthy()
  })
})
