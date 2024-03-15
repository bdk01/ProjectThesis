import React from 'react'
/* import Avatar from './Avatar' */
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Flex } from '@mantine/core'
import {  useKickForumDetail } from '../../hooks/detail-forum-hook'
import { createNotify } from '../../api/notifyAPI'
import axios from '../../axios'
import { useTranslation } from 'react-i18next'
const UserCardForumInvite = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, forum}) => {
    const dispatch = useDispatch()
    const { auth,socket} = useSelector(state => state)
    const { t } = useTranslation();

    const { id } = useParams()
    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }
    const Share = async()=>{
        console.log(forum)
        const msg = {
           /*  id: res.data.newPost._id, */
            text: `has invite you`,
            recipients: [user._id],
            url: `/forum/${forum._id}`,
            content:'New invite for you', 
            image: 'https://thumbs.dreamstime.com/b/group-people-logo-handshake-circle-teamwork-icon-vector-illustrator-150899205.jpg'
        }
        console.log(msg)
        /* dispatch(createNotify({msg, auth,dispatch, socket:socket.socket})) */
        const res =   await axios.post("/api/notify", msg , {
            headers: { Authorization: auth.accesstoken }
        })
        console.log(res)
    }
    return (
        <div className={`d-flex p-2 align-items-center justify-between w-100 mb-1 ${border}`}>
            <div className='flex  items-center'>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                className="d-flex align-items-center">
   
                 <div className=" flex justify-end w-[60px] h-[60px] mr-1 ">
                            <img
                                src={user.avatar}
                                className=" w-[100%] h-[100%] rounded-[50%]"
                            />
                            </div>

                    <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">{user.username}</span>
                        
                   
                    </div>
                </Link>
            </div>
                <Flex>
              {
                user._id === auth.user._id ?
                <></>
                :
                <Button
                variant='filled'
            
                color='blue'
                className=' ml-1 mb-1 bg-blue-500 '
                onClick={Share}
            >
                {t('Invite')}
            </Button>
              }
                </Flex>
            
            {children}
        </div>
    )
}

export default UserCardForumInvite
