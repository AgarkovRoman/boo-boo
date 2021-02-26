import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './SignIn.module.scss'
import * as ROUTER from '../../../constants/routes'
import { signInTC } from '../../../redux/auth/auth-reducer'

type FormData = {
  Email: string
  Password: string
}

export const SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [error, setError] = useState<string>('')

  const dispatch = useDispatch()
  const onSubmit = useCallback((data: FormData) => dispatch(signInTC(data.Email, data.Password)), [
    dispatch,
  ])

  console.log('SignIn errors: ', errors)

  return (
    <div className={classes.wrapper}>
      <div className={classes.formBox}>
        <h3 className={classes.title}>Sign In</h3>
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
            {/* {errors.Email && <p>Require field</p>} */}
          </label>

          <label className={classes.label}>
            Password
            <input
              type="password"
              placeholder="Password"
              name="Password"
              ref={register({ required: true, minLength: 6 })}
            />
            {/* {errors.Password && <p>Require field</p>} */}
          </label>
          <button className={classes.button} data-testid="sign-in" type="submit">
            SignIn
          </button>
        </form>

        <p>
          Don't have an account yet?
          <NavLink className={classes.signupLink} to={ROUTER.SIGN_UP}>
            Sign up now
          </NavLink>
        </p>
      </div>
    </div>
  )
}
