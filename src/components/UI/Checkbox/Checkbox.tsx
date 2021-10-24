import React, { useState } from 'react'
import { VscCheck } from 'react-icons/vsc'
import classes from './Checkbox.module.scss'

type CheckboxPropsI = {
  archiveTask: () => void
  name: string
}
export const Checkbox: React.FC<CheckboxPropsI> = ({ name, archiveTask }) => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)

  const handleArchiveTask = () => {
    setChecked(true)
    setTimeout(() => archiveTask(), 300)
  }

  return (
    <div
      className={classes.checkboxHolder}
      data-testid="checkbox-action"
      onClick={() => handleArchiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleArchiveTask()
      }}
      aria-label={`Mark ${name} as done?`}
      role="button"
      tabIndex={0}
    >
      <span
        className={`${classes.checkbox} ${checked && classes.checkboxChecked}`}
        data-testid="checkbox-circle"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseOver={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {(mouseEnter || checked) && (
          <span data-testid="checkbox-icon">
            <VscCheck />
          </span>
        )}
      </span>
    </div>
  )
}
