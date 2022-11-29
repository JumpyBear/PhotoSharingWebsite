import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
// go to different route app
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    let navigate = useNavigate()

    const { user, logout } = useContext(AuthContext)

    const showLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Photosharing</Link>

                    </Typography>
                    <Box alignItems="right" sx={{ flexGrow: 1, textAlign: 'right' }}>
                        {/* show the logout button or not */}
                        {
                            user ?
                                <>
                                    <Button onClick={showLogout} style={{ textDecoration: 'none', color: 'white', marginRight: '8px', fontWeight: '600' }}>Logout</Button>
                                </>
                            :

                                <>
                                    <Link to='/login' style={{ textDecoration: 'none', color: 'white', marginRight: '8px', fontWeight: '600' }}>LOGIN</Link>
                                    <Link to='/register' style={{ textDecoration: 'none', color: 'white', fontWeight: '600' }}>REGISTER</Link>
                                </>
                        }

                    </Box>
                    {/* <Button color="inherit">Login</Button>
                        <Button color="inherit">Register</Button> */}
                    {/* <Avatar alt="Logo" src="./" sx={{ width: 24, height: 24 }}/> */}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar