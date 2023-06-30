import React from 'react'
import UserCard from './UserCard'
import FollowBtn from '../buttons/FollowBtn'
import { useSelector } from 'react-redux'

const Followers = ({users, setShowFollowers}) => {
    const { auth } = useSelector(state => state)
    return (
        <div className="fixed top-0 left-0 bg-[#0008] w-[100%] h-[100vh] z-[50]">
            
            <div className="w-[350px]  rounded-sm bg-white relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  ">
                    <div className="absolute t-0 right-2  text-2xl cursor-pointer" onClick={() => setShowFollowers(false)}>
                        &times;  
                    </div>
             
                    <h5 className="text-center text-lg pb-1 pt-1 border-b-[1px] border-black">Followers</h5>    

           
                
                <div className="overflow-auto w-[100%] h-[350px]">
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers} >
                                {
                                    auth.user._id !== user._id && <FollowBtn user={user} />
                                }
                            </UserCard>
                        ))
                    }
                </div>
                

               
                
            </div>
        </div>
    )
}

export default Followers
