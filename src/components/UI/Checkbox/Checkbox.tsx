import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { VscCheck } from 'react-icons/vsc'
import classes from './Checkbox.module.scss'
import { CheckboxPropsI } from './index'
import { archiveTaskTC } from '../../../redux/tasks/tasks-reducer'

export const Checkbox: React.FC<CheckboxPropsI> = ({ id, taskDesc }) => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const dispatch = useDispatch()
  const archiveTask = useCallback((taskId) => dispatch(archiveTaskTC(taskId)), [dispatch])

  const handleArchiveTask = (taskId: string) => {
    setChecked(true)
    setTimeout(() => archiveTask(taskId), 300)
  }

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
      <span
        className={`${classes.checkbox} ${checked && classes.checkboxChecked}`}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseOver={() => setMouseEnter(true)}
        onFocus={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {mouseEnter && <VscCheck />}
      </span>
    </div>
  )
}
