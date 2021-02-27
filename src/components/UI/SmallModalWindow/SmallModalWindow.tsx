import React from 'react'
import classes from './SmallModalWindow.module.scss'
import { Button } from '../Button/Button'

interface SmallModalWindowPropsI {
  description: string
  deleteTask: () => void
  onClose: () => void
}

export const SmallModalWindow: React.FC<SmallModalWindowPropsI> = ({
  description,
  deleteTask,
  onClose,
}) => (
  <div className={classes.modal}>
    <p className={classes.title}>{description}</p>
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
