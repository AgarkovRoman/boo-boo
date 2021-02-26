import React from 'react'
import { VscKebabVertical } from 'react-icons/vsc'
import classes from './Task.module.scss'
import { Checkbox } from '../UI/Checkbox/Checkbox'

interface TaskPropsI {
  name: string
  id: string
}

export const Task: React.FC<TaskPropsI> = ({ name, id }) => (
  <>
    <li data-testid="task">
      <div className={classes.taskBody}>
        <Checkbox id={id} taskDesc={name} />
        <span className={classes.name}>{name}</span>
      </div>
      <div className={classes.kebab} role="button" tabIndex={0} aria-label={`Delete task ${name}`}>
        <VscKebabVertical />
      </div>
    </li>
  </>
)
