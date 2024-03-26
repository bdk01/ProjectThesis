import React from 'react'
/* import Avatar from './Avatar' */
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Flex } from '@mantine/core'
import {  useKickForumDetail } from '../../hooks/detail-forum-hook'

const UserCardForumMember = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg}) => {
   
    const { auth} = useSelector(state => state)
    console.log(user)
    const { mutateAsync: kickMember } =useKickForumDetail()
    const { id } = useParams()
    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
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
            
                color='red'
                className=' ml-1 mb-1 bg-red-400'
                onClick={()=>kickMember({id,userId:user._id,auth})}
            >
               Kick
            </Button>
              }
                </Flex>
            
            {children}
        </div>
    )
}

export default UserCardForumMember
