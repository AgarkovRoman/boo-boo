import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import classes from './Checkbox.module.scss'
import { CheckboxPropsI } from './index'
import { archiveTaskTC } from '../../../redux/tasks/tasks-reducer'

export const Checkbox: React.FC<CheckboxPropsI> = ({ id, taskDesc }) => {
  const dispatch = useDispatch()
  const handleArchiveTask = useCallback((taskId) => dispatch(archiveTaskTC(taskId)), [dispatch])

  return (
    <div
      className={classes.checkboxHolder}
      data-testid="checkbox-action"
      onClick={() => handleArchiveTask(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleArchiveTask(id)
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className={classes.checkbox} />
    </div>
  )
}
