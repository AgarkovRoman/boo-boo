import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IndividualProject } from '../components/IndividualProject/IndividualProject'

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('resolve')),
          update: jest.fn(),
        })),
      })),
    })),
  },
}))

// jest.mock('../context', () => ({
//   useSelectedProjectsValue: jest.fn(() => ({
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

describe('< IndividualProject />', () => {
  const project = {
    name: '🔧 Renovation',
    projectId: '2',
    userId: 'RM6FGvtHAMviaIDJNas',
  }

  describe('Success', () => {
    it('renders our project', () => {
      const { getByText } = render(<IndividualProject project={project} />)
      expect(getByText('🔧 Renovation')).toBeTruthy()
    })

    it('renders the delete overlay and then deletes a project using onClick', () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

      userEvent.click(queryByTestId('delete-project'))
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      userEvent.click(getByText('Delete'))
    })

    it('renders the delete overlay and then deletes a project using onKeyDown', () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'a',
        code: 65,
      })

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'Enter',
        code: 13,
      })
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      userEvent.click(getByText('Delete'))
    })

    it('renders the delete overlay and then cancels using onClick', () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

      userEvent.click(queryByTestId('delete-project'))
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      userEvent.click(getByText('Cancel'))
    })

    it('renders the delete overlay and then cancels using onKeyDown', () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'a',
        code: 65,
      })

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'Enter',
        code: 13,
      })
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      fireEvent.keyDown(getByText('Cancel'), {
        key: 'a',
        code: 65,
      })

      fireEvent.keyDown(getByText('Cancel'), {
        key: 'Enter',
        code: 13,
      })
    })
  })
})
