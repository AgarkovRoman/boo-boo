import React from 'react'
import { render } from '@testing-library/react'
import { BooBoo } from '../../components/pages/BooBoo/BooBoo'

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

describe(' < BooBoo />', () => {
  test('render BooBoo page', () => {
    const { getByTestId } = render(<BooBoo userId="123" />)
    expect(getByTestId('header')).toBeTruthy()
    expect(getByTestId('content')).toBeTruthy()
  })
})
