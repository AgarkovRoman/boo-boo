import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscKebabVertical } from 'react-icons/all'
import classes from './IndividualProject.module.scss'
import { INBOX } from '../../constants/defaultProjects'
import { deleteProjectTC, setActiveProject } from '../../redux/projects/projects-reducer'
import { getActiveProject } from '../../redux/projects/projects-selectors'
import { ProjectI, ProjectsStateI } from '../../redux/projects/projects-types'
import { DeleteProjectModal } from '../DeleteModal/DeleteProjectModal'
import { useOutsideClick } from '../../hooks/useOutSideClick'

interface IndividualProjectPropsI {
  project: ProjectI
}

export const IndividualProject: React.FC<IndividualProjectPropsI> = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const deleteModalRef = useRef(null)
  const activeProject = useSelector((state: ProjectsStateI) => getActiveProject(state))

  const dispatch = useDispatch()
  const selectProject = useCallback((id) => dispatch(setActiveProject(id)), [dispatch])
  const deleteProject = useCallback((id, userId) => dispatch(deleteProjectTC(id, userId)), [
    dispatch,
  ])

  const toggleDeleteModal = () => {
    setShowConfirm(!showConfirm)
  }

  useOutsideClick(deleteModalRef, showConfirm, toggleDeleteModal)

  return (
    <>
      <li
        key={project.projectId}
        className={`${classes.project} ${
          activeProject === project.projectId ? classes.active : ''
        }`}
        data-testid="project-action-parent"
      >
        <div className={classes.projectAction}>
          <div
            className={classes.projectItem}
            data-testid="project-action"
            aria-label={`Select ${project.name} as the task project`}
            role="button"
            data-doc-id={project.docId}
            tabIndex={0}
            onClick={() => {
              selectProject(project.projectId)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                selectProject(project.projectId)
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
          </div>
        </div>
      </li>
      {showConfirm && (
        <div className={classes.deleteModal} ref={deleteModalRef}>
          <DeleteProjectModal
            deleteProject={() => deleteProject(project.docId, project.userId)}
            selectProject={() => selectProject(INBOX)}
            setShowConfirm={() => toggleDeleteModal()}
          />
        </div>
      )}
    </>
  )
}
