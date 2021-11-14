import React, { useEffect, useState } from 'react'
import { FaRegListAlt, FaRegCalendarAlt, FaRegTimesCircle } from 'react-icons/fa'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { VscAdd } from 'react-icons/vsc'
import classes from './AddTask.module.scss'
import { ProjectOverlay } from '../ProjectOverlay/ProjectOverlay'
import { TaskDate } from '../TaskDate/TaskDate'
import { Button } from '../../../common/UI/Button/Button'
import { getActiveProject } from '../../../redux/projects/projects-selectors'
import { ProjectsStateI } from '../../../redux/projects/projects-types'
import { tasksAPI } from '../../../api/api'

interface AddTaskPropsI {
  showAddTaskMain?: boolean
  showShouldMain?: boolean
  showQuickAddTask?: boolean
  setShowQuickAddTask?: (value: boolean) => void
}

export const AddTask: React.FC<AddTaskPropsI> = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask = false,
  setShowQuickAddTask,
}) => {
  const [taskName, setTaskName] = useState<string>('')
  const [taskDate, setTaskDate] = useState<string>('')
  const [project, setProject] = useState<string>('')
  const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(showShouldMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState<boolean>(false)
  const [showTaskDate, setShowTaskDate] = useState<boolean>(false)

  const selectedProject = useSelector((state: ProjectsStateI) => getActiveProject(state))
  const [addTaskHandler, { data: addTaskResponse, isLoading }] = tasksAPI.useAddTaskMutation()
  const { refetch } = tasksAPI.useGetAllTasksByIdQuery('')

  const getTaskObject = () => {
    const projectId = project || selectedProject

    let collatedDate = ''
    if (projectId === 'TODAY') {
      collatedDate = dayjs().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_7') {
      collatedDate = dayjs().add(7, 'day').format('DD/MM/YYYY')
    }

    return (
      taskName &&
      projectId &&
      addTaskHandler({
        name: taskName,
        description: '',
        date: collatedDate || taskDate,
        archived: false,
        projectId,
      })
    )
  }

  const addTask = () => {
    setTaskName('')
    setProject('')
    setShowAddTaskInput(false)
    setShowProjectOverlay(false)

    return showQuickAddTask && setShowQuickAddTask
      ? getTaskObject() && setShowQuickAddTask(false)
      : getTaskObject()
  }

  useEffect(() => {
    if (!isLoading && addTaskResponse) {
      refetch()
    }
  }, [isLoading, addTaskResponse])
  return (
    <div
      className={showQuickAddTask ? classes.overlay : classes.addTask}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && !showAddTaskInput && (
        <div
          className={classes.shallow}
          data-testid="show-main-action"
          onClick={() => setShowAddTaskInput(!showAddTaskInput)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setShowAddTaskInput(!showAddTaskInput)
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className={classes.plus}>
            <VscAdd />
          </span>
          <span className={classes.text}>Add Task</span>
        </div>
      )}

      {(showAddTaskInput || showQuickAddTask) && (
        <div className={classes.main} data-testid="add-task-main">
          {/* Quick Add Task */}
          {showQuickAddTask !== undefined && setShowQuickAddTask !== undefined && (
            <>
              <div data-testid="quick-add-task">
                <h2 className={classes.title}>Quick Add Task</h2>
                <span
                  className={classes.cancelX}
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setTaskName('')
                    setShowAddTaskInput(false)
                    setShowProjectOverlay(false)
                    setShowQuickAddTask(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setTaskName('')
                      setShowAddTaskInput(false)
                      setShowProjectOverlay(false)
                      setShowQuickAddTask(false)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <FaRegTimesCircle />
                </span>
              </div>
            </>
          )}
          <div className={classes.taskProjectOverlay}>
            <ProjectOverlay
              setProject={setProject}
              showProjectOverlay={showProjectOverlay}
              setShowProjectOverlay={setShowProjectOverlay}
            />
          </div>
          <div className={classes.taskDateOverlay}>
            <TaskDate
              setTaskDate={setTaskDate}
              showTaskDate={showTaskDate}
              setShowTaskDate={setShowTaskDate}
            />
          </div>
          <input
            className={classes.content}
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Button
            onClick={() => addTask()}
            label="Add Task"
            color="primary"
            dataTestId="add-task"
          />

          {!showQuickAddTask && (
            <span className={classes.buttonCancel}>
              <Button
                onClick={() => {
                  setTaskName('')
                  setShowAddTaskInput(false)
                  setShowProjectOverlay(false)
                }}
                label="Cancel"
                color="transparent"
                dataTestId="add-task-main-cancel"
              />
            </span>
          )}

          <span
            className={classes.project}
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowProjectOverlay(!showProjectOverlay)
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className={classes.date}
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowTaskDate(!showTaskDate)
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  )
}
