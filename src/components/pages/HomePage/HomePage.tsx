import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './logo.svg'
import classes from './HomePage.module.scss'
import * as ROUTES from '../../../constants/routes'

export const HomePage: React.FC = () => (
  <div className={classes.homePage}>
    <div className={classes.homePageBody}>
      <header className={classes.header}>
        <NavLink to={ROUTES.HOME}>
          <img className={classes.logo} src={logo} alt="Boo-Boo logo" height="28" width="120" />
        </NavLink>
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
