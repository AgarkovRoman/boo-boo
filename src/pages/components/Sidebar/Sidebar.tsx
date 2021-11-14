import React, { useCallback, useState } from 'react'
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { VscChevronDown } from 'react-icons/vsc'
import classes from './Sidebar.module.scss'
import { Projects } from '../Projects/Projects'
import { AddProject } from '../AddProject/AddProject'
import { INBOX, NEXT_7, TODAY } from '../../../constants/defaultProjects'
import { getActiveProject } from '../../../redux/projects/projects-selectors'
import { TasksCounter } from '../../../common/UI/TasksCounter/TasksCounter'
import { setActiveProject } from '../../../redux/projects/projects-reducer'
import { ProjectsStateI } from '../../../redux/projects/projects-types'
import { tasksAPI } from '../../../api/api'

interface SidebarPropsI {
  userId: string
}

export const Sidebar: React.FC<SidebarPropsI> = ({ userId }) => {
  const [showProjects, setShowProjects] = useState<boolean>(true)

  const dispatch = useDispatch()

  const selectProject = useCallback((projectId) => dispatch(setActiveProject(projectId)), [
    dispatch,
  ])

  const { data: tasks } = tasksAPI.useGetAllTasksByIdQuery('')
  const inboxTaskCount = tasks?.filter((elem) => elem.projectId === INBOX).length || 0
  const todayTaskCount = tasks?.filter((elem) => elem.projectId === TODAY).length || 0
  const next7TaskCount = tasks?.filter((elem) => elem.projectId === NEXT_7).length || 0

  const activeProject = useSelector((state: ProjectsStateI) => getActiveProject(state))

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
          <VscChevronDown className={!showProjects ? classes.hiddenProject : ''} />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className={classes.projects}>{showProjects && <Projects />}</ul>
      {showProjects && <AddProject userId={userId} />}
    </div>
  )
}
