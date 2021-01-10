import React from 'react'
import classes from './Button.module.scss'
import { ButtonPropsI } from './index'

export const Button: React.FC<ButtonPropsI> = ({ onClick, label, dataTestId, color }) => (
  <button
    className={`${classes.mainBtn} ${classes[color]}`}
    type="button"
    onClick={() => onClick()}
    data-testid={dataTestId}
  >
    {label}
  </button>
)
