import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
// import classes from './IndividualProject.module.scss'
import { useProjectsValue, useSelectedProjectsValue } from '../../context'
import { firebase } from '../../firebase'
import { Button } from '../UI/Button/Button'

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProject } = useSelectedProjectsValue()

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects])
        setSelectedProject('INBOX')
      })
  }

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
                className="sidebar__project-delete"
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
        {showConfirm && (
                    <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <div className="project-delete-modal__buttons">
                <Button
                  onClick={() => deleteProject(project.docId)}
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
      </span>
    </>
  )
}
