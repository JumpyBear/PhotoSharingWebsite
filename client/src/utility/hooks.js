// Use hooks to make login forms and register forms more easily
import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (event) => {
        // change the input box: "email": "", "password": ""
        setValues({...values, [event.target.name]: event.target.value})
        // console.log(values)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        callback()
    }

    return {
        onChange,
        onSubmit,
        values
    }
}