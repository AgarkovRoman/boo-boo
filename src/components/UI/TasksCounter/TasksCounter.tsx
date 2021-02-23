import React from 'react'
import classes from './TaskCounter.module.scss'

interface TasksCounterPropsI {
  count: number
}

export const TasksCounter: React.FC<TasksCounterPropsI> = ({ count }) => (
  <>{count > 0 && <span className={classes.counter}>{count}</span>}</>
)
