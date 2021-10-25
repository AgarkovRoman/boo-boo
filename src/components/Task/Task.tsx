import React, { useCallback, useState } from 'react'
import { VscKebabVertical } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import classes from './Task.module.scss'
import { Checkbox } from '../UI/Checkbox/Checkbox'
import { archiveTaskTC, deleteTaskTC } from '../../redux/tasks/tasks-reducer'
import { SmallModalWindow } from '../UI/SmallModalWindow/SmallModalWindow'

interface TaskPropsI {
  name: string
  id: string
  projectId: string
  archived: boolean
  date: string
  description: string
}

export const Task: React.FC<TaskPropsI> = ({
  id,
  name,
  description,
  archived,
  date,
  projectId,
}) => {
  const [isModalDisplay, setIsModalDisplay] = useState(false)

  const dispatch = useDispatch()
  const deleteTask = useCallback((taskId: string) => dispatch(deleteTaskTC(taskId)), [dispatch])

  const archiveTask = useCallback(
    () => dispatch(archiveTaskTC(id, { name, description, archived, date, projectId })),
    [dispatch, id, name, description, archived, date, projectId]
  )

  return (
    <>
      <li data-testid="task">
        <div className={classes.taskBody}>
          <Checkbox name={name} archiveTask={archiveTask} />
          <span className={classes.name}>{name}</span>
        </div>
        <div
          className={classes.kebab}
          data-testid="task-kebab"
          role="button"
          tabIndex={0}
          aria-label={`${isModalDisplay ? 'Close' : 'Open'} delete task "${name}" modal?`}
          onClick={() => setIsModalDisplay(!isModalDisplay)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsModalDisplay(!isModalDisplay)
            }
          }}
        >
          <VscKebabVertical />
          {isModalDisplay && (
            <div className={classes.modal}>
              <SmallModalWindow
                description="Are you sure you want to delete this task?"
                deleteTask={() => deleteTask(id)}
                onClose={() => setIsModalDisplay(false)}
              />
            </div>
          )}
        </div>
      </li>
    </>
  )
}
