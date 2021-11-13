import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscKebabVertical } from 'react-icons/vsc'
import classes from './IndividualProject.module.scss'
import { INBOX } from '../../../constants/defaultProjects'
import { setActiveProject } from '../../../redux/projects/projects-reducer'
import { getActiveProject } from '../../../redux/projects/projects-selectors'
import { ProjectI, ProjectsStateI } from '../../../redux/projects/projects-types'
import { useOutsideClick } from '../../../hooks/useOutSideClick'
import { SmallModalWindow } from '../../../common/UI/SmallModalWindow/SmallModalWindow'
import { projectsAPI } from '../../../api/api'

interface IndividualProjectPropsI {
  project: ProjectI
  refetch: () => void
}

export const IndividualProject = ({ project, refetch }: IndividualProjectPropsI) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const deleteModalRef = useRef<HTMLDivElement>(null)

  const activeProject = useSelector((state: ProjectsStateI) => getActiveProject(state))

  const dispatch = useDispatch()
  const selectProject = useCallback((id) => dispatch(setActiveProject(id)), [dispatch])

  const [
    deleteProject,
    { data: deleteProjectResponse, isLoading },
  ] = projectsAPI.useDeleteProjectMutation()

  const toggleDeleteModal = () => {
    setShowConfirm(!showConfirm)
  }

  useOutsideClick(deleteModalRef, showConfirm, toggleDeleteModal)

  useEffect(() => {
    if (!isLoading && deleteProjectResponse && deleteProjectResponse.success) {
      refetch()
    }
  }, [deleteProjectResponse, isLoading])

  return (
    <>
      <li
        key={project.id}
        className={`${classes.project} ${activeProject === project.id ? classes.active : ''}`}
        data-testid="project-action-parent"
      >
        <div className={classes.projectAction}>
          <div
            className={classes.projectItem}
            data-testid="project-action"
            aria-label={`Select ${project.name} as the task project`}
            role="button"
            tabIndex={0}
            onClick={() => {
              selectProject(project.id)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                selectProject(project.id)
              }
            }}
          >
            <span className={classes.dot}>•</span>
            <span>{project.name}</span>
          </div>
          <div
            className={classes.delete}
            data-testid="delete-project"
            onClick={() => toggleDeleteModal()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') toggleDeleteModal()
            }}
            tabIndex={0}
            role="button"
            aria-label="Confirm deletion of project"
          >
            <VscKebabVertical />
            {showConfirm && (
              <div className={classes.deleteModal} ref={deleteModalRef}>
                <SmallModalWindow
                  description="Are you sure you want to delete this project?"
                  deleteTask={() => {
                    deleteProject(project.id)
                    selectProject(INBOX)
                  }}
                  onClose={() => setShowConfirm(false)}
                />
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  )
}
