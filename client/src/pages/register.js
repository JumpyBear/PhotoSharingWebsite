import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useForm } from '../utility/hooks'
import { useMutation } from '@apollo/react-hooks'

import { TextField, Button, Container, Alert, CssBaseline, Box, Avatar, Typography, Grid, Link } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

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
    const theme = createTheme()
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
        // <Container spacing={2} maxWidth="sm">
        //     <h3 style={{ textAlign: 'center' }}>Register Your Account</h3>
        //     <p style={{ color: 'gray', fontWeight: '600' }}>Register below to create your account and start sharing your photos!</p>
        //     <Stack spacing={2} paddingBottom={2}>
        //         <TextField
        //             label='Username'
        //             name='username'
        //             onChange={onChange}
        //         />
        //         <TextField
        //             label='Email'
        //             name='email'
        //             onChange={onChange}
        //         />
        //         <TextField
        //             label='Password'
        //             name='password'
        //             onChange={onChange}
        //         />
        //     </Stack>
        //     {/* Showing Error */}
        //     {errors.map(function (error) {
        //         return (
        //             <Alert severity="error">
        //                 {error.message}
        //             </Alert>
        //         )
        //     })}
        //     <Button type='submit' variant="contained" size='large' fullWidth={true} onClick={onSubmit}>Register</Button>
        // </Container>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    required
                                    fullWidth
                                    label="Username"
                                    autoFocus
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        {/* Showing Error */}
                        {errors.map(function (error) {
                            return (
                                <Alert severity="error">
                                    {error.message}
                                </Alert>
                            )
                        })}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onSubmit}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Login now!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Register