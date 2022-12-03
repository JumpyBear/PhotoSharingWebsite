import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useState } from 'react'
// import { Image } from 'cloudinary-react'

import './homepage.css'
import BackupIcon from '@mui/icons-material/Backup'
import PublishIcon from '@mui/icons-material/Publish';
import { Button, Link } from '@mui/material'
import Like from '../components/like'

// import Axios from 'axios'

function Homepage() {
    const { user } = useContext(AuthContext)

    const [imageSelected, setImageSelected] = useState([])

    // const uploadImage = () => {
    //     // console.log(files[0])
    //     const formData = new FormData()
    //     formData.append('file', imageSelected)
    //     formData.append('upload_preset', 'my_img_upload')

    //     Axios.post('https://api.cloudinary.com/v1_1/dyqi4aqqt/image/upload', formData).then((res) => {
    //         console.log(res)
    //     })
    // }

    const handleUploadImage = () => {
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dyqi4aqqt',
            uploadPreset: 'my_img_upload'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                // console.log('Done! Here is the image info: ', result.info)
                setImageSelected((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }])
            }
        }
        )
        myWidget.open()
    }

    return (
        <div style={{ backgroundColor: 'lightblue' }}>
            <h1 style={{ textAlign: 'center' }}>Welcome to the PhotoSharing Website!</h1>
            {
                user ?
                    <>
                        <h2 style={{ textAlign: 'center', color: 'blue' }}>Welcome! {user.username}</h2>
                        {/* upload images */}
                        <h2 style={{ textAlign: 'center', color: 'purple' }}>Please share your images below!</h2>
                        <div style={{ textAlign: 'center' }}>
                            <BackupIcon fontSize='large' />
                        </div>
                        {/* <div style={{ textAlign: 'center' }}>
                            <input type="file" onChange={(e) => { setImageSelected(e.target.files[0]) }} />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
                            <Button onClick={uploadImage} variant="contained" endIcon={<PublishIcon />}>Upload Image</Button>
                        </div> */}
                        <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
                            <Button onClick={() => handleUploadImage()} variant="contained" endIcon={<PublishIcon />}>Upload Image</Button>
                        </div>
                        {/* show image */}
                        <div className='image-container'>
                            {/* <Image cloudName='dyqi4aqqt' publicId='https://res.cloudinary.com/dyqi4aqqt/image/upload/v1669946389/qdnaryrzn3ivie7xi0gm.jpg' /> */}
                            {imageSelected.map((image) => (
                                <>
                                    <div className='image-preview'>
                                        <img src={image.url} alt="UploadImg" />
                                        {/* like button */}
                                        <Like />
                                    </div> 
                                </>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <h2 style={{ textAlign: 'center', color: 'red' }}>Uh...You are not logged in, please login or create an account first!</h2>
                        <h3 style={{ textAlign: 'center', color: 'blue' }}>
                            <Link href='/register'>{'Create account here'}</Link>
                            <br />
                            <Link href='/login'>{'Login here'}</Link>
                        </h3>
                    </>
            }

        </div>
    )
}

export default Homepage