import React, { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './SignIn.module.scss'
import mainClasses from '../mainStylesForPages.module.scss'
import * as ROUTER from '../../constants/routes'
import { Logo } from '../../common/UI/Logo/Logo'
import { authMeTC } from '../../redux/auth/auth-reducer'
import { authAPI } from '../../api/api'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [signIn] = authAPI.useSignInMutation()

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<FormData> = useCallback(
    ({ email: login, password }: FormData) =>
      signIn({ login, password }).then((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localStorage.setItem('authUser', JSON.stringify(res.data))
        dispatch(authMeTC())
      }),
    [dispatch]
  )

  useEffect(() => {
    document.title = `BOO—BOO: Sign In`
  })

  return (
    <div className={mainClasses.mainWrapper}>
      <div className={classes.wrapper}>
        <Header />
        <div className={mainClasses.main}>
          <div className={mainClasses.formBox}>
            <h3 className={mainClasses.title}>Sign In</h3>

            <form className={mainClasses.form} onSubmit={handleSubmit(onSubmit)}>
              <label className={mainClasses.label}>
                Email
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email', {
                    pattern: { value: /^\S+@\S+$/i, message: 'Incorrect email' },
                    required: 'This input is required.',
                  })}
                />
              </label>
              <div>
                {errors?.email && (
                  <p className={mainClasses.errorMessage}>{errors?.email.message}</p>
                )}
              </div>

              <label className={mainClasses.label}>
                Password
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'This input is required.',
                  })}
                />
              </label>
              <div>
                {errors?.password && (
                  <p className={mainClasses.errorMessage}>{errors?.password.message}</p>
                )}
              </div>

              <input
                className={mainClasses.button}
                data-testid="sign-in"
                value="Sign In"
                type="submit"
              />
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
