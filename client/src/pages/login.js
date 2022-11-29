import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useForm } from '../utility/hooks'
import { useMutation } from '@apollo/react-hooks'

import { TextField, Button, Container, Stack, Alert } from '@mui/material'

import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router-dom'

const LOGIN_USER = gql`
    mutation Mutation($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token
    }
  }
`

function Login(props) {
    // use authContext.js
    const context = useContext(AuthContext)

    // navigate to some page
    let navigate = useNavigate()

    // handle backend error
    const [errors, setErrors] = useState([])

    function loginUserCallback() {
        // console.log('Callback')
        // Call the mutations
        loginUser()
    }

    // handle the form value using useForm hooks
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    })

    const [loginUser] = useMutation(LOGIN_USER, {
        update(_, { data: { loginUser: userData } }) {
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
        variables: { loginInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3 style={{ textAlign: 'center' }}>Login Your Account</h3>
            <p style={{ color: 'gray', fontWeight: '600' }}>Login below to start sharing your photos!</p>
            <Stack spacing={2} paddingBottom={2}>
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
            <Button type='submit' variant="contained" size='large' fullWidth={true} onClick={onSubmit}>Login</Button>
        </Container>
    )
}

export default Login