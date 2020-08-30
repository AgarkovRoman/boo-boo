import React from 'react';
import './Input.css'

const Input = ({ name, type, value, onChange }) => {

    const onDoubleClickEvent = (e) => {
        e.target.select();
    }

    return (
        <>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onDoubleClick={onDoubleClickEvent}
            />
        </>
    )
}

export { Input }