import React from 'react'
import classes from './Checkbox.module.scss'
import { firebase } from '../../../firebase'
import { CheckboxPropsI } from './index'

export const Checkbox: React.FC<CheckboxPropsI> = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: true,
    })
  }

  return (
    <div
      className={classes.checkboxHolder}
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask()
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className={classes.checkbox} />
    </div>
  )
}
