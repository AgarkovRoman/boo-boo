import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './SignUp.module.scss'
import signInStyles from '../SignIn/SignIn.module.scss'
import * as ROUTER from '../../../constants/routes'
import { signUpTC } from '../../../redux/auth/auth-reducer'

type FormData = {
  Name: string
  Email: string
  Password: string
  // RepeatPassword: string
}

export const SignUp: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [error, setError] = useState<string>('')
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    (data: FormData) => dispatch(signUpTC(data.Email, data.Password, data.Name)),
    [dispatch]
  )

  console.log('SignUp errors: ', errors)

  return (
    <div className={classes.wrapper}>
      <div className={signInStyles.formBox}>
        <h3 className={signInStyles.title}>Sign Up</h3>
        {error}
        <form className={signInStyles.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input type="text" placeholder="Name" name="Name" ref={register({ required: true })} />
            {/* {errors.Email && <p>Require field</p>} */}
          </label>
          <label>
            Email
            <input
              type="text"
              placeholder="Email"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {/* {errors.Email && <p>Require field</p>} */}
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              name="Password"
              ref={register({ required: true, minLength: 6 })}
            />
            {/* {errors.Password && <p>Require field</p>} */}
          </label>
          {/* <label>Repeat Password */}
          {/*    <input type="password" placeholder="Repeat Password" name="RepeatPassword" */}
          {/*           ref={register({required: true, minLength: 6})}/> */}
          {/*    /!*{errors.Password && <p>Require field</p>}*!/ */}
          {/* </label> */}

          <button className={signInStyles.button} data-testid="sign-up" type="submit">
            Sign Up
          </button>
        </form>

        <p className={signInStyles.footerParagraph}>
          Already have an account?
          <NavLink className={signInStyles.footerLink} to={ROUTER.SIGN_IN}>
            Sign in now
          </NavLink>
        </p>
      </div>
    </div>
  )
}
