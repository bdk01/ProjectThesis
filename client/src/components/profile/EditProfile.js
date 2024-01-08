import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
/* import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction' */
import './profile.css'
import axios from '../../axios'
import { updateProfileUser } from '../../api/profileAPI'
const EditProfile = ({setOnEdit}) => {
    const initState = {
        fullname: '',username:''
    }
    const initState1 = {
        phone: '',introduction:''
    }
    const [userData, setUserData] = useState(initState)
    const [profile, setProfile] = useState(initState1)
    const { fullname,  username } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
        setProfile(auth.user.profile)
    }, [auth.user])


    const changeAvatar = async(e) => {
          console.log('fgf')
        e.preventDefault()
        try {

        /*     if (user.role !== 1) retuqrn alert("you are not admin") */
            const file = e.target.files[0]

            if (!file) return alert("file is not exist!")
            if (file.size > 1024 * 1024) return alert("Size is too large")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File is not the image")
            console.log(file)
            let formData = new FormData()
            formData.append('file', file);
            console.log(formData)
            console.log(auth.accesstoken)
            const res = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: auth.accesstoken }
            })
            console.log(res)
             setAvatar(res.data.url)
        }
        catch (err) {
            alert(err.respone.data.msg)
        }

    }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]:value })
    }
    const handleInput1 = e => {
        const { name, value } = e.target
        setProfile({ ...profile, [name]:value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(userData)
     /*    console.log(avatar) */
        console.log(profile)
        const userData1 = {...userData,profile}
        console.log(userData1)
        updateProfileUser({userData1, avatar, auth,dispatch})
        setOnEdit(false)
    }

    return (
       /*  <div className="flex justify-center items-center fixed top-0 left-0 w-[100%] h-[100vh] bg-[#0008] z-[109] overflow-auto">

                <button className="absolute top-[4px] right-[4px] bg-red-500"
                onClick={() => setOnEdit(false)} >
                    Close
                </button>
            <form onSubmit={handleSubmit} className='max-w-[450px] w-[100%] bg-white p-[20px] rounded-lg mx-[20px] my-auto'>
                <div className="w-[150px] h-[150px] overflow-hidden rounded-[50%] relative mx-[15px] my-auto border-black boder-1px cursor-pointer hover:bottom-[-15%]">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                    alt="avatar" className='w-[100%] h-[100%] block object-cover' />
                    <span className='absolute bottom-[-100%] left-0 w-[100%] h-[50%] text-center text-orange-500 transition-all bg-[#fff5] '>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" className='absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0'
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div> */
             <div className="edit_profile">
            <button className="btn btn-danger btn_close"
            onClick={() => setOnEdit(false)}>
                Close
            </button>
        
            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img /* src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}  */src={avatar ? avatar : auth.user.avatar}
                    alt="avatar"  />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="fullname" value={fullname} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" value={profile.phone}
                    className="form-control" onChange={handleInput1} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username}
                    className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Introduction</label>
                    <input type="text" name="introduction" value={profile.introduction}
                    className="form-control" onChange={handleInput1} />
                </div>

   

                <button className="btn btn-info font-normal text-slate-600 w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile
