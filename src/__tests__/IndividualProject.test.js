import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IndividualProject } from '../components/IndividualProject/IndividualProject'
import { renderWithRedux } from './utils/renderWithRedux'

const project = {
  name: '🔧 Renovation',
  projectId: '2',
  userId: 'RM6FGvtHAMviaIDJNas',
}

describe('< IndividualProject />', () => {
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

    it('renders the projects with no active value', () => {
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

    test('renders the delete overlay and then deletes a project using onClick', () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

      userEvent.click(queryByTestId('delete-project'))
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      userEvent.click(getByText('Delete'))
    })

    test('renders the delete overlay and then deletes a project using onKeyDown', () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

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

    test('renders the delete overlay and then cancels using onClick', () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

      userEvent.click(queryByTestId('delete-project'))
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

      userEvent.click(getByText('Cancel'))
    })

    test('renders the delete overlay and then cancels using onKeyDown', () => {
      const { queryByTestId, getByText } = renderWithRedux(<IndividualProject project={project} />)

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
