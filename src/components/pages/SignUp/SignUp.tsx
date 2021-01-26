import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import classes from './SignUp.module.scss'
import * as ROUTER from '../../../constants/routes'
import { FirebaseContext } from '../../../context/firebase'
import { authAPI } from '../../../api/api'

type FormData = {
  Name: string
  Email: string
  Password: string
  // RepeatPassword: string
}

export const SignUp: React.FC = () => {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm<FormData>()
  const { firebase }: any = useContext(FirebaseContext)
  const [error, setError] = useState()

  const onSubmit = (data: FormData) => {
    authAPI
      .signUp(data.Email, data.Password)
      .then((result: any) => {
        result.user?.updateProfile({
          displayName: data.Name,
        })
      })
      .then(() => {
        history.push(ROUTER.APP)
      })
      .catch((error: any) => {
        setError(error.message)
      })
  }

  console.log(errors)

  return (
    <div className={classes.wrapper}>
      <div className={classes.formBox}>
        <h3 className={classes.title}>Регистрация</h3>
        {error}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input type="text" placeholder="Name" name="Name" ref={register({ required: true })} />
            {/* {errors.Email && <p>Обязательное поле</p>} */}
          </label>
          <label>
            Email
            <input
              type="text"
              placeholder="Email"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {/* {errors.Email && <p>Обязательное поле</p>} */}
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              name="Password"
              ref={register({ required: true, minLength: 6 })}
            />
            {/* {errors.Password && <p>Обязательное поле</p>} */}
          </label>
          {/* <label>Repeat Password */}
          {/*    <input type="password" placeholder="Repeat Password" name="RepeatPassword" */}
          {/*           ref={register({required: true, minLength: 6})}/> */}
          {/*    /!*{errors.Password && <p>Обязательное поле</p>}*!/ */}
          {/* </label> */}

          <button className={classes.button} data-testid="sign-up" type="submit">
            Зарегистрироваться
          </button>
        </form>

        <p>
          Уже есть аккаунт?
          <NavLink className={classes.signinLink} to={ROUTER.SIGN_IN}>
            Sign in now
          </NavLink>
        </p>
      </div>
    </div>
  )
}
