import React, { useState } from 'react'
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks";
import { Input } from '../Input';


export const Content = () => {

    const [state, setState] = useState('1');


    const handleChange = (e) => {

        // const str = e.target.value;
        // const regex = /^([1-9][0-9]?|100)$/;

        // if (regex.test(str)) {
        //     setState(e.target.value)
        // }
        setState(e.target.value)

    }

    return (
        <section>
            <Sidebar />
            <Tasks />
            <Input
                type={'number'}
                name={'number'}
                value={state}
                onChange={handleChange}
            />
            <span>{state}</span>
        </section>
    )
}