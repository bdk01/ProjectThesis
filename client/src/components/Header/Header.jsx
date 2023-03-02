import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './header.css'
import axios from '../../axios'
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../api/authAPI";

export default function Header() {
  const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [avatar,setAvatar] = useState('')
  const {user} = useSelector(state => state.auth)
  useEffect(()=>{
  
    setAvatar(user.avatar)
  },[user])
    // Function
       const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);
        try {
          const res = await axios.get(`/user/search?username=${search}`)
          console.log(search)
          console.log(res.data)
          setSearchUsers(res.data.users)
          /*   const res = await getDataAPI(`search?username=${search}`, auth.token) */
           /*  setSearchUsers(res.data.users) */
        } catch (err) {
          console.log(err)
        }
    }
    const handleClick = e =>{
       e.preventDefault()
       setOpen(!open)
    }
    const handleLogout = e =>{
        e.preventDefault()
        Logout(dispatch)
        console.log("logout")
       setOpen(false)
    }
  return (
    
        <div className=" bg-black grid grid-cols-8 p-2 ">
          
                <div className="col-span-2 flex justify-center items-center">
                  <Link to="/" className="logo">
                      <h1 className="text-white text-2xl"
                      onClick={() => window.scrollTo({top: 0})}>
                          TA-NETWORK
                      </h1>
                  </Link>

                </div>
                <div className="col-span-4" >

                 <form className="w-[100%]" onSubmit={handleSearch} >
                    <input type="text" value={search} className="w-[75%] border-none outline-none p-2 text-black" 
                    placeholder="Enter to Search..."
                    onChange={e => setSearch(e.target.value)} />

                    <button type="submit" style={{display: 'none'}}>Search</button>
                 </form>
                </div>

                <div className="col-span-2  flex justify-center items-center relative">
                    <div className=" ">
                  {
                    avatar ?
                    <div className=" flex justify-end w-[40px] h-[40px]  ">
                        <img src={avatar} className=" w-[100%] h-[100%] rounded-[50%]" onClick={handleClick}/>
                    </div>
                  
                    :
                    <div className="flex justify-center items-center">
                      <Link to="/login" className="font-semibold text-blue-700 mr-3">
                          Đăng nhập
                       </Link>
                      <Link to="/login" className="font-semibold text-blue-700">
                          Đăng Ký
                       </Link>
                    </div>
                  }
                    </div>
                    {
                      open?
                      <div className="bg-gray-700 py-2 px-4  cursor-pointer  absolute top-[102%] right-[45%] rounded-md flex justify-center items-center" onClick={handleLogout} >
                       <div className=" w-[100%] h-[100%]  cursor-pointer" onClick={handleLogout}>
                        Logout
                        </div> 
                        </div> 
                      :<></>
                    }
                </div>
                  
        </div>
    )
}
