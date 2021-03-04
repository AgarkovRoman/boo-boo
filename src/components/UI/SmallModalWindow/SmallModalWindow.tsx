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
  <div className={classes.modal} data-testid="small-modal-window">
    <p className={classes.title}>{description}</p>
    <div className={classes.buttons}>
      <Button
        onClick={() => {
          deleteTask()
        }}
        label="Delete"
        color="primary"
        dataTestId="small-modal-window-delete"
      />
      <Button
        onClick={() => onClose()}
        label="Cancel"
        color="transparent"
        dataTestId="small-modal-window-cancel"
      />
    </div>
  </div>
)
