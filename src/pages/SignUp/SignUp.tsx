import React, {useContext, useState} from 'react'
import {useForm} from 'react-hook-form';
import classes from './SignUp.module.scss'
import {NavLink, useHistory} from "react-router-dom";
import * as ROUTER from '../../constants/routes'
import {FirebaseContext} from "../../context/firebase";

type FormData = {
    Email: string
    Password: string
    // RepeatPassword: string
}

export const SignUp: React.FC = () => {
    const history = useHistory()
    const {register, handleSubmit, errors} = useForm<FormData>();
    const {firebase}:any = useContext(FirebaseContext)
    const [error, setError] = useState()

    const onSubmit = (data: FormData) => {
        console.log("data", data);
        firebase
            .auth()
            .createUserWithEmailAndPassword(data.Email, data.Password)
            .then(() => {
                history.push(ROUTER.HOME)
            })
            .catch((error:any) => {
                setError(error.message)
            })
    };

    console.log(errors);

    return (
        <div className={classes.wrapper}>
            <h3>Регистрация</h3>
            {error}
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
