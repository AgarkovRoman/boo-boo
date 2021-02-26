import React from 'react'
import classes from './DeleteTaskModal.module.scss'
import { Button } from '../UI/Button/Button'

interface DeleteTaskModalPropsI {
  deleteTask: () => void
  onClose: () => void
}

export const DeleteTaskModal: React.FC<DeleteTaskModalPropsI> = ({ deleteTask, onClose }) => (
  <div className={classes.modal}>
    <p className={classes.title}>Are you sure you want to delete this task?</p>
    <div className={classes.buttons}>
      <Button
        onClick={() => {
          deleteTask()
        }}
        label="Delete"
        color="primary"
      />
      <Button onClick={() => onClose()} label="Cancel" color="transparent" />
    </div>
  </div>
)
