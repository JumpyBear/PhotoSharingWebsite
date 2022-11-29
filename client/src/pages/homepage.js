import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

function Homepage() {
    const { user } = useContext(AuthContext)

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Welcome to the PhotoSharing Website!</h1>
            {
                user?
                <>
                    <h2 style={{textAlign: 'center', color: 'lightblue'}}>Welcome! {user.username}</h2>
                </>
                :
                <>
                    <h2 style={{textAlign: 'center', color: 'red'}}>Uh...You are not logged in, please login or create an account first!</h2>
                </>
            }
        
        </>
    )
}

export default Homepage