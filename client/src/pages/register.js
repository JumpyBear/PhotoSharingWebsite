import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useForm } from '../utility/hooks'
import { useMutation } from '@apollo/react-hooks'

import { TextField, Button, Container, Stack, Alert } from '@mui/material'

import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router-dom'

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) { 
        username
        email
        password
        token
        }
    }
`

function Register(props) {
    // use authContext.js
    const context = useContext(AuthContext)

    // navigate to some page
    let navigate = useNavigate()

    // handle backend error
    const [errors, setErrors] = useState([])

    function registerUserCallback() {
        console.log('Callback')
        // Call the mutations
        registerUser()
    }

    // handle the form value using useForm hooks
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: ''
    })

    const [registerUser] = useMutation(REGISTER_USER, {
        update(_, { data: { registerUser: userData } }) {
            // console.log(userData)
            context.login(userData)
            // navigate to the homepage
            navigate('/')
            // props.history.push('/')
        },
        onError({ graphQLErrors }) {
            // Get error array from backend
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3 style={{ textAlign: 'center' }}>Register Your Account</h3>
            <p style={{ color: 'gray', fontWeight: '600' }}>Register below to create your account and start sharing your photos!</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label='Username'
                    name='username'
                    onChange={onChange}
                />
                <TextField
                    label='Email'
                    name='email'
                    onChange={onChange}
                />
                <TextField
                    label='Password'
                    name='password'
                    onChange={onChange}
                />
            </Stack>
            {/* Showing Error */}
            {errors.map(function (error) {
                return (
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                )
            })}
            <Button type='submit' variant="contained" size='large' fullWidth={true} onClick={onSubmit}>Register</Button>
        </Container>
    )
}

export default Register