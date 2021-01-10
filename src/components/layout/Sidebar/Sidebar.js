import React, { useState } from 'react'
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'
import classes from './Sidebar.module.scss'
import { useSelectedProjectsValue } from '../../../context'
import { Projects } from '../../Projects/Projects'
import { AddProject } from '../../AddProject/AddProject'

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectsValue()
  const [active, setActive] = useState('inbox')
  const [showProjects, setShowProjects] = useState(true)

  return (
    <div className={classes.sidebar} data-testing="sidebar">
      <ul className={classes.generic}>
        <li data-testid="inbox" className={active === 'inbox' ? 'active' : null}>
          <div
            aria-label="Show inbox tasks"
            onClick={() => {
              setActive('inbox')
              setSelectedProject('INBOX')
            }}
            onKeyDown={() => {
              setActive('inbox')
              setSelectedProject('INBOX')
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
        <li data-testid="today" className={active === 'today' ? 'active' : null}>
          <div
            aria-label="Show today`s tasks"
            onClick={() => {
              setActive('today')
              setSelectedProject('TODAY')
            }}
            onKeyDown={() => {
              setActive('today')
              setSelectedProject('TODAY')
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
        <li data-testid="next_7" className={active === 'next_7' ? 'active' : null}>
          <div
            aria-label="Show tasks for the next 7 days"
            onClick={() => {
              setActive('next_7')
              setSelectedProject('NEXT_7')
            }}
            onKeyDown={() => {
              setActive('next_7')
              setSelectedProject('NEXT_7')
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
        // className="sidebar__middle"
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
