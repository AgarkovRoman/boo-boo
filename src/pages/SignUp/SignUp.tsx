import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './SignUp.module.scss'
import mainClasses from '../mainStylesForPages.module.scss'
import * as ROUTER from '../../constants/routes'
import { signUpTC } from '../../redux/auth/auth-reducer'
import { Header } from '../SignIn/SignIn'

type FormData = {
  name: string
  email: string
  password: string
  // repeatPassword: string
}

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const dispatch = useDispatch()
  const onSubmit = useCallback((data: FormData) => dispatch(signUpTC(data.email, data.password)), [
    dispatch,
  ])

  console.log('SignUp errors: ', errors)

  useEffect(() => {
    document.title = `BOO—BOO: SignUp`
  })

  return (
    <div className={mainClasses.mainWrapper}>
      <div className={classes.wrapper}>
        <Header />
        <div className={mainClasses.main}>
          <div className={mainClasses.formBox}>
            <h3 className={mainClasses.title}>Sign Up</h3>

            <form className={mainClasses.form} onSubmit={handleSubmit(onSubmit)}>
              {/* <label> */}
              {/*  Name */}
              {/*  <input */}
              {/*    type="text" */}
              {/*    placeholder="Name" */}
              {/*    name="Name" */}
              {/*    ref={register({ required: true })} */}
              {/*  /> */}
              {/*  /!* {errors.Email && <p>Require field</p>} *!/ */}
              {/* </label> */}
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
                    minLength: {
                      value: 6,
                      message: 'Password length should exceed 6 characters',
                    },
                    required: 'This input is required.',
                  })}
                />
              </label>
              <div>
                {errors?.password && (
                  <p className={mainClasses.errorMessage}>{errors?.password.message}</p>
                )}
              </div>

              {/* <label>Repeat Password */}
              {/*    <input type="password" placeholder="Repeat Password" name="RepeatPassword" */}
              {/*           ref={register({required: true, minLength: 6})}/> */}
              {/*    /!*{errors.Password && <p>Require field</p>}*!/ */}
              {/* </label> */}

              <button className={mainClasses.button} data-testid="sign-up" type="submit">
                Sign Up
              </button>
            </form>

            <p className={mainClasses.footerParagraph}>
              Already have an account?
              <NavLink className={mainClasses.footerLink} to={ROUTER.SIGN_IN}>
                Sign in now
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
