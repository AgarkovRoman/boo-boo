import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './SignIn.module.scss'
import mainClasses from '../mainStylesForPages.module.scss'
import * as ROUTER from '../../constants/routes'
import { signInTC } from '../../redux/auth/auth-reducer'
import { Logo } from '../../common/UI/Logo/Logo'

type FormData = {
  email: string
  password: string
}

export const Header = () => (
  <header className={mainClasses.header} data-testid="header">
    <Logo />
  </header>
)

export const SignIn = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [
    error,
    // setError
  ] = useState<string>('')

  const dispatch = useDispatch()
  const onSubmit = useCallback((data: FormData) => dispatch(signInTC(data.email, data.password)), [
    dispatch,
  ])

  console.log('SignIn errors: ', errors)

  useEffect(() => {
    document.title = `BOO—BOO: SignIn`
  })

  return (
    <div className={mainClasses.mainWrapper}>
      <div className={classes.wrapper}>
        <Header />

        <div className={mainClasses.main}>
          <div className={mainClasses.formBox}>
            <h3 className={mainClasses.title}>Sign In</h3>
            {error}
            <form className={mainClasses.form} onSubmit={handleSubmit(onSubmit)}>
              <label className={mainClasses.label}>
                Email
                <input
                  autoComplete="on"
                  type="text"
                  placeholder="Email"
                  name="email"
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                {/* {errors.Email && <p>Require field</p>} */}
              </label>

              <label className={mainClasses.label}>
                Password
                <input
                  autoComplete="on"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true, minLength: 6 })}
                />
                {/* {errors.Password && <p>Require field</p>} */}
              </label>
              <button className={mainClasses.button} data-testid="sign-in" type="submit">
                Sign In
              </button>
            </form>

            <p className={mainClasses.footerParagraph}>
              Don't have an account yet?
              <NavLink className={mainClasses.footerLink} to={ROUTER.SIGN_UP}>
                Sign up now
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
