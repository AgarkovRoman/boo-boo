import React, {useContext, useState} from 'react'
import classes from './SignIn.module.scss'
import {useForm} from 'react-hook-form';
import {NavLink, useHistory} from "react-router-dom";
import * as ROUTER from '../../../constants/routes'
import {FirebaseContext} from "../../../context/firebase";

type FormData = {
    Email: string
    Password: string
}

export const SignIn: React.FC = () => {
    const history = useHistory()
    const {firebase}: any = useContext(FirebaseContext)
    const {register, handleSubmit, errors} = useForm<FormData>();
    const [error, setError] = useState()

    const onSubmit = (data: FormData) => {
        console.log("data", data);
        firebase
            .auth()
            .signInWithEmailAndPassword(data.Email, data.Password)
            .then(() => {
                history.push(ROUTER.APP)
            })
            .catch((error: any) => {
                setError(error.message)
            })
    };

    console.log(errors);

    return (
        <div className={classes.wrapper}>
            <div className={classes.formBox}>
                <h3 className={classes.title}>Вход</h3>
                {error}
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <label className={classes.label}>Email
                        <input type="text" placeholder="Email" name="Email"
                               ref={register({required: true, pattern: /^\S+@\S+$/i})}/>
                        {/*{errors.Email && <p>Обязательное поле</p>}*/}
                    </label>
                    <label className={classes.label}>Password
                        <input type="password" placeholder="Password" name="Password"
                               ref={register({required: true, minLength: 6})}/>
                        {/*{errors.Password && <p>Обязательное поле</p>}*/}
                    </label>

                    <button
                        className={classes.button}
                        type="submit"
                    >Войти
                    </button>
                </form>
                <p>Еще нет аккаунта? <NavLink to={ROUTER.SIGN_UP}>Sign up now</NavLink></p>
            </div>
        </div>
    )
}
