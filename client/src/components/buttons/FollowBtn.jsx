import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../../api/profileAPI'

/* import { follow, unfollow } from '../redux/actions/profileAction' */

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile } = useSelector(state => state)
    const {  socket } = useSelector(state => state.socket)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    useEffect(() => {
     
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow =  async () => {
        if(load) return;
      
        setFollowed(true)
        setLoad(true)
    
     /*    await dispatch(follow({users: profile.users, user, auth, socket})) */
      follow({users: profile.users, user, auth,dispatch,socket})
        setLoad(false)
    }

    const handleUnFollow = async () => {
        if(load) return;
        
        setFollowed(false)
        setLoad(true)
        console.log(user)
      await  unfollow({users: profile.users, user, auth,dispatch})

        setLoad(false)
    }

    return (
        <>
        {
            followed
            ? <button className="btn btn-outline-danger"
            onClick={handleUnFollow}>
                UnFollow
            </button>
            : <button className="btn btn-outline-info"
            onClick={handleFollow}>
                Follow
            </button>
        }
        </>
    )
}

export default FollowBtn
