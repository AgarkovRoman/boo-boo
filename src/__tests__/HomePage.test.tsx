import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HomePage } from '../components/pages/HomePage/HomePage'
import '@testing-library/jest-dom/extend-expect'

describe('< HomePage />', () => {
  test('render HomePage with document.title', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    // screen.debug()
    expect(getByTestId('logo')).toBeTruthy()
    expect(getByTestId('home-page')).toBeTruthy()
    expect(global.window.document.title).toBe('BOO—BOO: Home')
  })
})
