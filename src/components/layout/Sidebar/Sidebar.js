import React, { useCallback, useState } from 'react'
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Sidebar.module.scss'
import { Projects } from '../../Projects/Projects'
import { AddProject } from '../../AddProject/AddProject'
import { setActiveProject } from '../../../redux/projects-reducer'
import { INBOX, NEXT_7, TODAY } from '../../../constants/defaultProjects'
import { getActiveProject } from '../../../redux/projects-selectors'

export const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true)

  const activeProject = useSelector((state) => getActiveProject(state))
  const dispatch = useDispatch()
  const selectProject = useCallback((projectId) => dispatch(setActiveProject(projectId)), [
    dispatch,
  ])

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
      {showProjects && <AddProject />}
    </div>
  )
}
