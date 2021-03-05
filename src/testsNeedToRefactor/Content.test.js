import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Content } from '../components/layout/Content/Content'

// jest.mock('../context', () => ({
//   useSelectedProjectValue: jest.fn(() => ({
//     setSelectedProject: jest.fn(() => 'INBOX'),
//   })),
//   useProjectsValue: jest.fn(() => ({
//     setProjects: jest.fn(),
//     projects: [
//       {
//         name: '🔧 Renovation',
//         projectId: '2',
//         userId: 'RM6FGvtHAMviaIDJNas',
//       },
//     ],
//   })),
// }))

describe('< Content />', () => {
  it('render Content', () => {
    const { getByTestId } = render(<Content />)
    screen.debug()
    expect(getByTestId('content')).toBeTruthy()
    screen.debug()
  })
})
