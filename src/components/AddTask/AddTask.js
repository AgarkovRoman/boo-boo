import React, { useCallback, useState } from 'react'
import { FaRegListAlt, FaRegCalendarAlt, FaRegTimesCircle } from 'react-icons/fa'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import classes from './AddTask.module.scss'
import { ProjectOverlay } from '../ProjectOverlay/ProjectOverlay'
import { TaskDate } from '../TaskDate/TaskDate'
import { Button } from '../UI/Button/Button'
import { getActiveProject } from '../../redux/projects-selectors'
import { addTaskTC } from '../../redux/tasks-reducer'

export const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [taskName, setTaskName] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [project, setProject] = useState('')
  const [showAddTaskInput, setShowAddTaskInput] = useState(showShouldMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)

  const dispatch = useDispatch()
  const selectedProject = useSelector((state) => getActiveProject(state))
  const addTaskHandler = useCallback((task) => dispatch(addTaskTC(task)), [dispatch])

  const addTask = () => {
    const projectId = project || selectedProject

    let collatedDate = ''
    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
    }

    return (
      taskName &&
      projectId &&
      addTaskHandler({
        archived: false,
        projectId,
        createDate: Date.now(),
        task: taskName,
        date: collatedDate || taskDate,
        userId: 'RM6FGvtHAMviaIDJNas',
      }).then(() => {
        setTaskName('')
        setProject('')
        setShowAddTaskInput(false)
        setShowProjectOverlay(false)
      })
    )
  }

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
          <span className={classes.plus}>+</span>
          <span className={classes.text}>Add Task</span>
        </div>
      )}

      {(showAddTaskInput || showQuickAddTask) && (
        <div className={classes.main} data-testid="add-task-main">
          {showQuickAddTask && (
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
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className={classes.content}
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Button
            onClick={() => {
              showQuickAddTask ? addTask() && setShowQuickAddTask(false) : addTask()
            }}
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
