import React from 'react'
import { NavLink } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import classes from './Logo.module.scss'
import logo from '../../../pages/HomePage/logo.svg'

export const Logo: React.FC = () => (
  <NavLink to={ROUTES.HOME} data-testid="logo">
    <img className={classes.logo} src={logo} alt="Boo-Boo logo" height="28" width="120" />
  </NavLink>
)
