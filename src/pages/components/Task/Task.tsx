import React, { useCallback, useEffect, useState } from 'react'
import { VscKebabVertical } from 'react-icons/vsc'
import classes from './Task.module.scss'
import { Checkbox } from '../../../common/UI/Checkbox/Checkbox'
import { SmallModalWindow } from '../../../common/UI/SmallModalWindow/SmallModalWindow'
import { tasksAPI } from '../../../api/api'

interface TaskPropsI {
  name: string
  id: string
  projectId: string
  archived: boolean
  date: string
  description: string
  refetch: () => void
}

export const Task = ({ id, name, description, archived, date, projectId, refetch }: TaskPropsI) => {
  const [isModalDisplay, setIsModalDisplay] = useState(false)

  const [
    deleteTask,
    { isLoading: isDeleteTaskLoading, data: deleteTaskResponse },
  ] = tasksAPI.useDeleteTaskMutation()
  const [
    updateTask,
    { isLoading: isUpdateTaskLoading, data: updateTaskResponse },
  ] = tasksAPI.useUpdateTaskByIdMutation()

  const archiveTask = useCallback(
    () => updateTask({ taskId: id, task: { name, description, archived: true, date, projectId } }),
    [id, name, description, archived, date, projectId]
  )

  useEffect(() => {
    if (!isUpdateTaskLoading && updateTaskResponse) {
      refetch()
    }
  }, [isUpdateTaskLoading, updateTaskResponse])

  useEffect(() => {
    if (!isDeleteTaskLoading && deleteTaskResponse && deleteTaskResponse.success) {
      refetch()
    }
  }, [isDeleteTaskLoading, deleteTaskResponse])

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
