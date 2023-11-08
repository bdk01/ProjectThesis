import axios from '../../axios';
import React, { useEffect, useRef, useState } from "react";
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import UserCard from './UserCard';
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from '../../api/messageAPI';
import { AddUser } from '../../redux/messageSlice';
export default function LeftSide() {
    const [search, setSearch] = useState('')
const pathname = useLocation()
      const { auth,message } = useSelector(state => state)
    const [searchUsers, setSearchUsers] = useState([])
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pageEnd = useRef()
    const [page, setPage] = useState(0)
      useEffect(() => {
        if(auth.accesstoken){
          
          console.log(pathname)
         let page =1
         getConversations(auth,page,dispatch)
        
        }
    },[dispatch, auth,pathname,message.userChat])
   /*    useEffect(() => {
        dispatch()
    },[dispatch, auth,id]) */
    // Function
       const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);
        try {
          const res = await axios.get(`/api/search?meetingName=${search}`,{
        headers: { Authorization: auth.accesstoken },
      })
    
          setSearchUsers(res.data)
        } catch (err) {
          console.log(err)
        }
    }
    const handleAddUser = (user)=>{
        setSearch('')
        setSearchUsers([])
        console.log("adduserleft")
        console.log(user)
       /*  if(!id){ */
          dispatch(AddUser({ ...user, text: '', media: [] }))

       /*  } */

      /* AddUser */
     return navigate(`/conversation/${user.conversation}`);

    }
    const handleGetUser = (user)=>{
        setSearch('')
        setSearchUsers([])
        console.log("getuserleft")
        console.log(user)
       /*  if(!id){ */
       
       /*  } */

      /* AddUser */
     return navigate(`/conversation/${user.conversation}`);

    }


  return <div>
          <form className="w-[100%]" onSubmit={handleSearch} >
                <input type="text" value={search} className="w-[100%]  border-gray-400  border-b-[2px] outline-none px-3 py-3"
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
                                onClick={() => handleGetUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>
                         :
                         <>
                           {
                            message?.users.map(user => (
                              <div key={user._id} className={`hover:bg-slate-300 hover:transition-all cursor-pointer flex flex-row items-center justify-between `}
                                onClick={() => handleAddUser(user)}>
                                 
                                    <UserCard user={user} msg={true} >
                                  
                                    </UserCard>
                                 {/*    <div className="bg-green-500 w-[12px] h-[12px] mr-2 rounded-[50%]" /> */}
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
