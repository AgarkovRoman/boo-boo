import React, { useCallback, useState } from 'react'
import { VscKebabVertical } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import classes from './Task.module.scss'
import { Checkbox } from '../UI/Checkbox/Checkbox'
import { DeleteTaskModal } from './DeleteTaskModal'
import { deleteTaskTC } from '../../redux/tasks/tasks-reducer'

interface TaskPropsI {
  name: string
  id: string
}

export const Task: React.FC<TaskPropsI> = ({ name, id }) => {
  const [isModalDisplay, setIsModalDisplay] = useState(false)

  const dispatch = useDispatch()
  const deleteTask = useCallback((taskId: string) => dispatch(deleteTaskTC(taskId)), [dispatch])

  return (
    <>
      <li data-testid="task">
        <div className={classes.taskBody}>
          <Checkbox id={id} taskDesc={name} />
          <span className={classes.name}>{name}</span>
        </div>
        <div
          className={classes.kebab}
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
              <DeleteTaskModal
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
