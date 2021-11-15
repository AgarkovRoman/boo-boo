import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { store } from '../../redux/redux-store'

export const renderWithRedux = (component: React.ReactNode) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
})
