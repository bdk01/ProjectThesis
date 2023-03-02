import axios from '../axios';
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import UserCard from './UserCard';
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from '../api/messageAPI';
import { AddUser } from '../redux/messageSlice';
export default function LeftSide() {
    const [search, setSearch] = useState('')
      const { auth,message } = useSelector(state => state)
    const [searchUsers, setSearchUsers] = useState([])
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const pageEnd = useRef()
    const [page, setPage] = useState(0)
      useEffect(() => {
        if(message.firstLoad) return;

       let page =1
       getConversations(auth,page,dispatch)
    },[dispatch, auth])
    // Function
       const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);
        try {
          const res = await axios.get(`/user/search?username=${search}`)
          setSearchUsers(res.data.users)
        } catch (err) {
          console.log(err)
        }
    }
    const handleAddUser = (user)=>{
        setSearch('')
        setSearchUsers([])
        console.log("adduser")
       
      dispatch(AddUser({ ...user, text: '', media: [] }))
     /*  dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online }) */
      /* AddUser */
        return history.push(`/conversation/${user._id}`)
    }
  /* useEffect(() => {
    if (message.firstLoad) {
      dispatch(Online(online))
    }
  }, [online, message.firstLoad, dispatch]) */

  return <div>
          <form className="w-[100%]" onSubmit={handleSearch} >
                <input type="text" value={search} className="w-[100%]  border-gray-400  border-b-[2px] outline-none px-3 py-4"
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{display: 'none'}}>Search</button>
          </form>
           <div className="">
                {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            //them user o handleAdduser
                            searchUsers.map(user => (
                              <div key={user._id} className="hover:bg-slate-300 hover:transition-all cursor-pointer"
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>
                         :
                         <>
                           {
                            message.users.map(user => (
                              <div key={user._id} className={`hover:bg-slate-300 hover:transition-all cursor-pointer flex flex-row items-center justify-between `}
                                onClick={() => handleAddUser(user)}>
                                 
                                    <UserCard user={user} msg={true} >
                                      {/*   {
                                            user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) && 
                                                
                                        } */}
                                    </UserCard>
                                    <div className="bg-green-500 w-[12px] h-[12px] mr-2 rounded-[50%]" />
                                  {/*   <div className="bg-gray-500 w-[12px] h-[12px] mr-2 rounded-[50%]" /> */}
                                </div>
                            ))
                        }
                         </>
                /*   : <>
                     
               
              <button ref={pageEnd} style={{opacity: 0}} >Load More</button>  */
               }
            </div>
     </div>;
}