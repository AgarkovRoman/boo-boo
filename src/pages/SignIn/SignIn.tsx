import React from 'react'
import {useForm} from 'react-hook-form';
import classes from './SignIn.module.scss'
import {NavLink} from "react-router-dom";
import * as ROUTER from '../../constants/routes'

type FormData = {
    Email: string
    Password: string
}

export const SignIn: React.FC = () => {
    const {register, handleSubmit, errors} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("data", data);
    };

    console.log(errors);

    return (
        <div className={classes.wrapper}>
            <h3>Вход</h3>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <label>Email
                    <input type="text" placeholder="Email" name="Email"
                           ref={register({required: true, pattern: /^\S+@\S+$/i})}/>
                    {/*{errors.Email && <p>Обязательное поле</p>}*/}
                </label>
                <label>Password
                    <input type="password" placeholder="Password" name="Password"
                           ref={register({required: true, minLength: 6})}/>
                    {/*{errors.Password && <p>Обязательное поле</p>}*/}
                </label>

                <button
                    className={classes.button}
                    type="submit"
                >Войти</button>

                <p>Еще нет аккаунта? <NavLink to={ROUTER.SIGN_UP}>Sign up now</NavLink></p>
            </form>
        </div>
    )
}
