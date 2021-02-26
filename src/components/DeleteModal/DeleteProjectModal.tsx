import React from 'react'
import classes from './DeleteProjectModal.module.scss'
import { Button } from '../UI/Button/Button'

interface DeleteModalPropsI {
  deleteProject: () => void
  selectProject: () => void
  setShowConfirm: () => void
}

export const DeleteProjectModal: React.FC<DeleteModalPropsI> = ({
  deleteProject,
  selectProject,
  setShowConfirm,
}) => (
  <div className={classes.modal}>
    <p className={classes.title}>Are you sure you want to delete this project?</p>
    <div className={classes.buttons}>
      <Button
        onClick={() => {
          deleteProject()
          selectProject()
        }}
        label="Delete"
        color="primary"
      />
      <Button onClick={() => setShowConfirm()} label="Cancel" color="transparent" />
    </div>
  </div>
)
