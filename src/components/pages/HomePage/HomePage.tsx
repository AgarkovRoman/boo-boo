import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './logo.svg'
import classes from './HomePage.module.scss'
import * as ROUTES from '../../../constants/routes'
import mainClasses from '../mainStylesForPages.module.scss'

export const Logo: React.FC = () => (
  <NavLink to={ROUTES.HOME}>
    <img className={classes.logo} src={logo} alt="Boo-Boo logo" height="28" width="120" />
  </NavLink>
)

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = `BOO—BOO: Home`
  })

  return (
    <div className={mainClasses.mainWrapper}>
      <div className={classes.homePageBody}>
        <header className={classes.header}>
          <Logo />
          <nav className={classes.navList}>
            <ul className={classes.navListUl}>
              <li className={classes.navListElement}>
                <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
              </li>
              <li className={`${classes.navListElement} ${classes.navListElement__mainColored}`}>
                <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <div>
          <h1 className={classes.headerTitle}>{`Keep an eye\n on your tasks.`}</h1>

          <div className={classes.getStartedContainer}>
            <NavLink className={classes.getStarted} to={ROUTES.SIGN_IN}>
              Get started
            </NavLink>
          </div>
        </div>

        <div className={classes.manImage} />
      </div>
    </div>
  )
}
