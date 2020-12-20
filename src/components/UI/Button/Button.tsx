import React from 'react'
import './Button.scss'
import {ButtonPropsI} from "./index";

export const Button: React.FC<ButtonPropsI> = ({onClick, label, dataTestId, color}) => {

    return (
        <button
            className={`main-button main-button--${color}`}
            type="button"
            onClick={() => onClick()}
            data-testid={dataTestId ? dataTestId : null}
        >
            {label}
        </button>
    )
}
