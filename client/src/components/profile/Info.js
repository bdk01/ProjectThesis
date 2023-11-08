import React, { useState, useEffect } from 'react'
/* import Avatar from '../Avatar' */
import axios from '../../axios'
import EditProfile from './EditProfile'
import FollowBtn from '../buttons/FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { useNavigate } from 'react-router-dom'
import { AddUser } from '../../redux/messageSlice'
/* import { GLOBALTYPES } from '../../redux/actions/globalTypes' */

const Info = ({id, auth, profile, dispatch}) => {
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const navigate = useNavigate()
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
        if(id === auth.user._id){
        
            setUserData([auth.user])
               console.log(userData)
        }else{
            const newData = profile.users.filter(user => user._id === id)
          
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])
    const handleToMessage = async()=>{
      /*   console.log(auth.user.username)
        console.log({ senderName:auth.user.username,
        recipientName:userData[0].username}) */
       /*  dispatch */
       const res = await axios.post('/api/findOrCreate-Conversation',{
        sender:auth.user._id
        ,recipient:id,
       senderName:auth.user.username,
        recipientName:userData[0].username
       },{
        headers: { Authorization: auth.accesstoken },
      }
      )
      console.log(res.data)
      const user = res.data
      navigate(`/conversation/${res.data.conversation}`);
      console.log('info')
       dispatch(AddUser({ ...user, text: '', media: [] }))
       /*     navigate(`/conversation`) */
          /*   window.location.href = `/conversation/${res.data._id}`; */
    }

  /*   useEffect(() => {
        if(showFollowers || showFollowing || onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
            
        }
    },[showFollowers, showFollowing, onEdit, dispatch]) */
    

    return (
        <div className="w-[100%] max-w-[800px] m-auto px-[10px] py-[20px]">
            {
                userData.map(user => (
                    <div className="flex flex-wrap justify-around" key={user._id}>
                    {/*     <Avatar src={user.avatar} size="supper-avatar" /> */}
                         <div className=" flex justify-end w-[110px] h-[110px] mr-1 ">
                            <img
                                src={user.avatar}
                                className=" w-[100%] h-[100%] rounded-[50%]"
                                /*   onClick={handleClick} */
                            />
                            </div>
                        <div className="min-w-[250px] max-w-[550px] w-[100%] flex-1 opacity-[0.7] mx-[15px]">
                            <div className="flex items-center flex-wrap ">
                                <h2 className='text-xl font-extrabold flex-[3] '>{user.username}</h2>
                                {
                                    user._id === auth.user._id
                                    ?  <button className="btn btn-outline-info "
                                    onClick={() => setOnEdit(true)}>
                                        Edit Profile
                                    </button>
                                    
                                    : 
                                    <div>
                                    <FollowBtn user={user} className=""/>
                                <button className="btn btn-outline-info ml-3" onClick={handleToMessage} >
                                        Message
                                    </button>

                                    </div>
                                }
                                
                            </div>

                            <div className="flex-[2] cursor-pointer">
                                <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                    {user.followers.length} Followers
                                </span>
                                <span className="ml-4" onClick={() => setShowFollowing(true)}>
                                    {user.following.length} Following
                                </span>
                            </div>

                            <h6 className='mb-[2px]'>Name: {user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                         
                            <h6 className="m-0 mb-[2px]">Email: {user.email}</h6>
                            <h4 className="m-0 mb-[2px]">{user.introduction}</h4>
                            <h4 className="m-0 mb-[2px]">Contact: {user.phone}</h4>
                          
                         {/*    <p>{user.story}</p> */}
                        </div>

                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }

                        {
                            showFollowers &&
                            <Followers 
                            users={user.followers} 
                            setShowFollowers={setShowFollowers} 
                            />
                        }
                        {
                            showFollowing &&
                            <Following 
                            users={user.following} 
                            setShowFollowing={setShowFollowing} 
                            />
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Info
