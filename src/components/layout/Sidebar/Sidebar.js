import React, { useCallback, useState } from 'react'
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import classes from './Sidebar.module.scss'
import { Projects } from '../../Projects/Projects'
import { AddProject } from '../../AddProject/AddProject'
import { setProject } from '../../../redux/projects-reducer'
import { INBOX, NEXT_7, TODAY } from '../../../constants/defaultProjects'

export const Sidebar = () => {
  const [active, setActive] = useState('inbox')
  const [showProjects, setShowProjects] = useState(true)

  const dispatch = useDispatch()
  const selectProject = useCallback((project) => dispatch(setProject(project)), [dispatch])

  return (
    <div className={classes.sidebar} data-testid="sidebar">
      <ul className={classes.generic}>
        <li data-testid="inbox" className={active === 'inbox' ? classes.active : ''}>
          <div
            aria-label="Show inbox tasks"
            data-testid="inbox-action"
            onClick={() => {
              setActive('inbox')
              selectProject(INBOX)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('inbox')
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
        <li data-testid="today" className={active === 'today' ? classes.active : ''}>
          <div
            aria-label="Show today`s tasks"
            data-testid="today-action"
            onClick={() => {
              setActive('today')
              selectProject(TODAY)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('today')
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
        <li data-testid="next_7" className={active === 'next_7' ? classes.active : ''}>
          <div
            aria-label="Show tasks for the next 7 days"
            data-testid="next_7-action"
            onClick={() => {
              setActive('next_7')
              selectProject(NEXT_7)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('next_7')
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
