import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Sidebar.module.scss'
import { Projects } from '../../Projects/Projects'
import { AddProject } from '../../AddProject/AddProject'
import { getAllProjectTC, setActiveProject } from '../../../redux/projects-reducer'
import { INBOX, NEXT_7, TODAY } from '../../../constants/defaultProjects'
import { getActiveProject } from '../../../redux/projects-selectors'
import { TasksCounter } from '../../UI/TasksCounter/TasksCounter'
import {
  getInboxTasksCounter,
  getNext7TasksCounter,
  getTodayTasksCounter,
} from '../../../redux/tasks-selectors'
import { getAllTasksTC } from '../../../redux/tasks-reducer'

export const Sidebar = ({ userId }) => {
  const [showProjects, setShowProjects] = useState(true)

  const dispatch = useDispatch()
  // Get all projects & tasks from back and set it in redux
  const getAllProjects = useCallback(() => dispatch(getAllProjectTC(userId)), [dispatch, userId])
  const getAllTasks = useCallback(() => dispatch(getAllTasksTC(userId)), [dispatch, userId])

  const selectProject = useCallback((projectId) => dispatch(setActiveProject(projectId)), [
    dispatch,
  ])

  const selectInboxTaskCountMemoized = useMemo(() => getInboxTasksCounter, [])
  const selectTodayTaskCountMemoized = useMemo(() => getTodayTasksCounter, [])
  const selectNext7TaskCountMemoized = useMemo(() => getNext7TasksCounter, [])

  const inboxTaskCount = useSelector((state) => selectInboxTaskCountMemoized(state))
  const todayTaskCount = useSelector((state) => selectTodayTaskCountMemoized(state))
  const next7TaskCount = useSelector((state) => selectNext7TaskCountMemoized(state))

  const activeProject = useSelector((state) => getActiveProject(state))
  // const inboxTaskCount = useSelector((state) => getInboxTasksCounter(state))
  // const todayTaskCount = useSelector((state) => getTodayTasksCounter(state))
  // const next7TaskCount = useSelector((state) => getNext7TasksCounter(state))

  useEffect(() => {
    getAllProjects()
    getAllTasks()
  }, [dispatch, getAllProjects, getAllTasks])

  return (
    <div className={classes.sidebar} data-testid="sidebar">
      <ul className={classes.generic}>
        <li data-testid="inbox" className={activeProject === INBOX ? classes.active : ''}>
          <div
            aria-label="Show inbox tasks"
            data-testid="inbox-action"
            onClick={() => {
              selectProject(INBOX)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                selectProject(INBOX)
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>

            <span className={classes.taskCounterContainer}>
              <TasksCounter count={inboxTaskCount} />
            </span>
          </div>
        </li>
        <li data-testid="today" className={activeProject === TODAY ? classes.active : ''}>
          <div
            aria-label="Show today`s tasks"
            data-testid="today-action"
            onClick={() => {
              selectProject(TODAY)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                selectProject(TODAY)
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span>
              <span>
                <FaRegCalendar />
              </span>
              <span>Today</span>
              <span className={classes.taskCounterContainer}>
                <TasksCounter count={todayTaskCount} />
              </span>
            </span>
          </div>
        </li>
        <li data-testid="next_7" className={activeProject === NEXT_7 ? classes.active : ''}>
          <div
            aria-label="Show tasks for the next 7 days"
            data-testid="next_7-action"
            onClick={() => {
              selectProject(NEXT_7)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                selectProject(NEXT_7)
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
            <span className={classes.taskCounterContainer}>
              <TasksCounter count={next7TaskCount} />
            </span>
          </div>
        </li>
      </ul>

      <div
        className={classes.middle}
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowProjects(!showProjects)
        }}
        aria-label={`${showProjects ? 'Hide' : 'Show'} projects`}
        role="button"
        tabIndex={0}
      >
        <span className={classes.iconChevron}>
          <FaChevronDown className={!showProjects ? classes.hiddenProject : ''} />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className={classes.projects}>{showProjects && <Projects />}</ul>
      {showProjects && <AddProject userId={userId} />}
    </div>
  )
}
