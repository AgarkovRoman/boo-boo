import React from 'react'
import { render } from '@testing-library/react'
import { AppRouter } from '../routes/AppRouter'
import { FirebaseContext } from '../context/firebase'

const firebase = {
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(() => Promise.resolve('sign in')),
  })),
}

jest.mock('../hooks', () => ({
  useAuthListener: jest.fn(() => ({ user: {} })),
}))

jest.mock('../context', () => ({
  useSelectedProjectsValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}))

jest.mock('../hooks', () => ({
  useTasks: jest.fn(() => ({
    tasks: [
      {
        id: '0HTGB1k3BXUYVh6nn2Vy',
        archived: false,
        date: '15/11/2020',
        projectId: '1',
        task: 'задача на завтра в ворк',
        userId: 'RM6FGvtHAMviaIDJNas',
      },
    ],
  })),
}))

describe('< AppRouter />', () => {
  it('render the AppRouter', () => {
    const { getByTestId, queryByTestId } = render(
      <FirebaseContext.Provider value={{ firebase }}>
        <AppRouter />
      </FirebaseContext.Provider>
    )

    expect(queryByTestId('application')).toBeTruthy()
    // expect(getByTestId('application').classList.contains('darkmode')).toBeFalsy()
  })
})
