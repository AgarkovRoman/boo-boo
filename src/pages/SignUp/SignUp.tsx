import React from 'react'
import {useForm} from 'react-hook-form';
import classes from './SignUp.module.scss'
import {NavLink} from "react-router-dom";
import * as ROUTER from '../../constants/routes'

type FormData = {
    Email: string
    Password: string
    // RepeatPassword: string
}

export const SignUp: React.FC = () => {
    const {register, handleSubmit, errors} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("data", data);
    };

    console.log(errors);

    return (
        <div className={classes.wrapper}>
            <h3>Регистрация</h3>
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
                {/*<label>Repeat Password*/}
                {/*    <input type="password" placeholder="Repeat Password" name="RepeatPassword"*/}
                {/*           ref={register({required: true, minLength: 6})}/>*/}
                {/*    /!*{errors.Password && <p>Обязательное поле</p>}*!/*/}
                {/*</label>*/}

                <button
                    className={classes.button}
                    type="submit"
                >Зарегистрироваться</button>

                <p>Уже есть аккаунт? <NavLink to={ROUTER.SIGN_IN}>Sign in now</NavLink></p>
            </form>
        </div>
    )
}
