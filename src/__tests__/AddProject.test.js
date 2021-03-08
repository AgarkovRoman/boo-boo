import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddProject } from '../components/AddProject/AddProject'

// jest.mock('../context', () => ({
//   useSelectedProjectValue: jest.fn(),
//   useProjectsValue: jest.fn(() => ({
//     projects: [
//       {
//         name: '🔧 Renovation',
//         projectId: '2',
//         userId: 'RM6FGvtHAMviIDJNas',
//       },
//       {
//         name: '💻 Work',
//         projectId: '1',
//         userId: 'RM6FGvtHAMviIDJNas',
//       },
//     ],
//     setProjects: jest.fn(),
//   })),
// }))

jest.mock('react-redux', () => ({
  // ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}))

describe('< AddProject />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    test('renders < AddProject />', () => {
      const { queryByTestId, getByTestId } = render(
        <AddProject shouldShow={false} userId="123456" />
      )
      expect(getByTestId('add-project')).toBeTruthy()
      expect(getByTestId('add-project-action')).toBeTruthy()
    })

    test('renders < AddProject /> and show overlay using onClick', () => {
      const { queryByTestId, getByTestId } = render(
        <AddProject shouldShow={false} userId="123456" />
      )
      expect(getByTestId('add-project')).toBeTruthy()
      expect(getByTestId('add-project-action')).toBeTruthy()
      userEvent.click(getByTestId('add-project-action'))
      expect(queryByTestId('project-name')).toBeTruthy()
      expect(queryByTestId('add-project-submit')).toBeTruthy()
      expect(queryByTestId('hide-project-overlay')).toBeTruthy()
    })

    test('renders < AddProject /> and show overlay using keyDown', () => {
      const { queryByTestId, getByTestId } = render(
        <AddProject shouldShow={false} userId="123456" />
      )
      expect(getByTestId('add-project')).toBeTruthy()
      expect(getByTestId('add-project-action')).toBeTruthy()
      fireEvent.keyDown(getByTestId('add-project-action'), {
        key: 'a',
        keyCode: 'KeyA',
      })
      fireEvent.keyDown(getByTestId('add-project-action'), {
        key: 'Enter',
        keyCode: 'Enter',
      })
      expect(queryByTestId('project-name')).toBeTruthy()
      expect(queryByTestId('add-project-submit')).toBeTruthy()
      expect(queryByTestId('hide-project-overlay')).toBeTruthy()
    })

    test('renders < AddProject /> and adds a project using onClick', () => {
      const setShow = jest.fn(() => !setShow)
      const { queryByTestId, getByTestId } = render(<AddProject shouldShow userId="123456" />)
      expect(getByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeTruthy()

      userEvent.type(queryByTestId('project-name'), 'Best project in the world!')
      expect(queryByTestId('project-name').value).toBe('Best project in the world!')
      userEvent.click(queryByTestId('add-project-submit'))
    })

    it('hides the project overlay when cancelled using onClick', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow userId="123456" />)
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeTruthy()

      userEvent.click(getByText('Cancel'))
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeFalsy()
    })
  })
})
