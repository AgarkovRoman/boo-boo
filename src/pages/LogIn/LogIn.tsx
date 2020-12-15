import React from 'react'
import {useForm} from 'react-hook-form';
import classes from './Login.module.scss'


type FormData = {
    Email: string
    Password: string
}

export const LogIn: React.FC = () => {

    const {register, handleSubmit, errors} = useForm<FormData>();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <div className={classes.wrapper}>
            <form className={classes.form}>
                <label>Email
                    <input type="text" placeholder="Email" name="Email"
                           ref={register({required: true, pattern: /^\S+@\S+$/i})}/>
                </label>
                <label>Password
                    <input type="password" placeholder="Password" name="Password"
                           ref={register({required: true, minLength: 6, maxLength: 25})}/>
                </label>

                <button className={classes.button} type="button">Войти</button>
            </form>
        </div>
    )
}
