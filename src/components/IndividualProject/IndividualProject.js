import React, { useCallback, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import classes from './IndividualProject.module.scss'
import { Button } from '../UI/Button/Button'
import { INBOX } from '../../constants/defaultProjects'
import { deleteProjectTC, setActiveProject } from '../../redux/projects-reducer'
import { getActiveProject } from '../../redux/projects-selectors'

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const activeProject = useSelector((state) => getActiveProject(state))
  const dispatch = useDispatch()
  const selectProject = useCallback((id) => dispatch(setActiveProject(id)), [dispatch])
  const deleteProject = useCallback((id) => dispatch(deleteProjectTC(id)), [dispatch])

  // const deleteProject = (docId) => {
  //   firebase
  //     .firestore()
  //     .collection('projects')
  //     .doc(docId)
  //     .delete()
  //     .then(() => {
  //       setProjects([...projects])
  //       setSelectedProject('INBOX')
  //     })
  // }

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
            onClick={() => setShowConfirm(!showConfirm)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowConfirm(!showConfirm)
            }}
            tabIndex={0}
            role="button"
            aria-label="Confirm deletion of project"
          >
            <FaTrashAlt />
          </div>
        </div>
      </li>
      {showConfirm && (
        <div className="project-delete-modal">
          <div className="project-delete-modal__inner">
            <p>Are you sure you want to delete this project?</p>
            <div className="project-delete-modal__buttons">
              <Button
                onClick={() => {
                  deleteProject(project.docId)
                  selectProject(INBOX)
                }}
                label="Delete"
                color="primary"
              />
              <Button
                onClick={() => setShowConfirm(!showConfirm)}
                label="Cancel"
                color="transparent"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
