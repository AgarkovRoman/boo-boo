import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './SignIn.module.scss'
import * as ROUTER from '../../../constants/routes'
import { signInTC } from '../../../redux/auth-reducer'

type FormData = {
  Email: string
  Password: string
}

export const SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [error, setError] = useState()

  const dispatch = useDispatch()
  const onSubmit = useCallback((data: FormData) => dispatch(signInTC(data.Email, data.Password)), [
    dispatch,
  ])

  console.log('SignIn errors: ', errors)

  return (
    <div className={classes.wrapper}>
      <div className={classes.formBox}>
        <h3 className={classes.title}>Вход</h3>
        {error}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.label}>
            Email
            <input
              type="text"
              placeholder="Email"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {/* {errors.Email && <p>Обязательное поле</p>} */}
          </label>

          <label className={classes.label}>
            Password
            <input
              type="password"
              placeholder="Password"
              name="Password"
              ref={register({ required: true, minLength: 6 })}
            />
            {/* {errors.Password && <p>Обязательное поле</p>} */}
          </label>
          <button className={classes.button} data-testid="sign-in" type="submit">
            Войти
          </button>
        </form>

        <p>
          Ещё нет аккаунта?
          <NavLink className={classes.signupLink} to={ROUTER.SIGN_UP}>
            Sign up now
          </NavLink>
        </p>
      </div>
    </div>
  )
}
