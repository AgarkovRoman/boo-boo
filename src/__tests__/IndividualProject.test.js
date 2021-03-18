import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IndividualProject } from '../components/IndividualProject/IndividualProject'
import { renderWithRedux } from './utils/renderWithRedux'

const project = {
  name: '🔧 Renovation',
  projectId: '2',
  docId: '2',
  userId: 'RM6FGvtHAMviaIDJNas',
}

describe('< IndividualProject />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Success', () => {
    test('renders our project', () => {
      const { getByText } = renderWithRedux(<IndividualProject project={project} />)
      expect(getByText('🔧 Renovation')).toBeTruthy()
    })

    test('render and select an active project using onClick', () => {
      const { getByTestId } = renderWithRedux(<IndividualProject project={project} />)
      expect(getByTestId('project-action')).toBeTruthy()
      userEvent.click(getByTestId('project-action'))
      expect(getByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    })

    test('renders the projects and selects an active project using onKeyDown', () => {
      const { getByTestId, queryByTestId } = renderWithRedux(
        <IndividualProject project={project} />
      )
      expect(getByTestId('project-action')).toBeTruthy()
      fireEvent.keyDown(getByTestId('project-action'), {
        key: 'a',
        code: 65,
      })
      expect(queryByTestId('project-action-parent').classList.contains('active')).toBeFalsy()

      fireEvent.keyDown(getByTestId('project-action'), {
        key: 'Enter',
        code: 13,
      })
      expect(getByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    })

    test('renders the projects with no active value', () => {
      const { queryByTestId } = renderWithRedux(<IndividualProject project={project} />)
      expect(queryByTestId('project-action')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('project-action'), {
        key: 'a',
        code: 65,
      })
      expect(queryByTestId('project-action-parent').classList.contains('active')).toBeFalsy()

      fireEvent.keyDown(queryByTestId('project-action'), {
        key: 'Enter',
        code: 13,
      })
      expect(queryByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    })

    test('renders the delete overlay and then deletes a project using onClick', async () => {
      const deleteProject = jest.fn()
      const { queryByTestId, getByText, findByText, findByTestId } = renderWithRedux(
        <IndividualProject project={project} />
      )

      await userEvent.click(queryByTestId('delete-project'))
      expect(await findByText('Are you sure you want to delete this project?')).toBeTruthy()

      expect(await findByTestId('small-modal-window-delete')).toBeTruthy()

      // screen.debug()
      await act(async () => {
        fireEvent.click(queryByTestId(`small-modal-window-delete`))
      })
      // await userEvent.click(queryByTestId('small-modal-window-delete'))
      expect(await findByTestId('small-modal-window')).toBeFalsy()

      expect(deleteProject).toBeCalledWith({
        docId: '2',
        userId: 'RM6FGvtHAMviaIDJNas',
      })
    })

    test('renders the delete overlay and then deletes a project using onKeyDown', async () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

      await fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'a',
        code: 65,
      })

      await fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'Enter',
        code: 13,
      })
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      await fireEvent.click(queryByTestId('small-modal-window-delete'))
    })

    test('renders the delete overlay and then cancels using onClick', async () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

      await userEvent.click(queryByTestId('delete-project'))
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      await userEvent.click(getByText('Cancel'))
    })

    test('renders the delete overlay and then cancels using onKeyDown', async () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

      await fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'a',
        code: 65,
      })

      await fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'Enter',
        code: 13,
      })
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      await fireEvent.keyDown(getByText('Cancel'), {
        key: 'a',
        code: 65,
      })

      await fireEvent.keyDown(getByText('Cancel'), {
        key: 'Enter',
        code: 13,
      })
    })
  })
})
