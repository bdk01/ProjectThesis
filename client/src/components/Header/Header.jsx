import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './header.css'
import axios from '../../axios'
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../api/authAPI";
import { BiLogOut} from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header({setOpened ,opened}) {
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
    
        <div className=" bg-white grid grid-cols-8 p-2 w-[100%] border-b-[1px] border-black ">
                <div className="col-span-2 flex justify-start items-center">
                  <button    type="button" onClick={() => setOpened(!opened)} >

                  <AiOutlineMenu className=" w-[30px] h-[30px] cursor-pointer mr-6 ml-2"   />
                  </button>
                  <Link to="/home" className="logo ">
                      <img className="text-white text-2xl" src="https://socialite-template.netlify.app/assets/images/logo.png"
                      onClick={() => window.scrollTo({top: 0})}>
                        
                      </img>
                  </Link>

                </div>
                <div className="col-span-4" >

                 <form className="w-[100%]" onSubmit={handleSearch} >
                    <input type="text" value={search} className="w-[75%] bg-gray-200 rounded-full border-none outline-none py-2 px-5 text-[#424242]" 
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
                      <Link to="/login" className="font-semibold text-black mr-3">
                          Đăng nhập
                       </Link>
                      <Link to="/login" className="font-semibold text-black">
                          Đăng Ký
                       </Link>
                    </div>
                  }
                    </div>
                    {
                      open?
                      <div className="bg-gray-150 w-[200px] h-[120px]  absolute top-[102%] right-[45%] rounded-md flex flex-col " onClick={handleLogout} >
                        <div className="flex justify-start p-2 border-b-[1px] border-white">
                        <div className=" flex  w-[45px] h-[45px]  ">
                          <img src={avatar} className=" w-[100%] h-[100%] rounded-[50%]" onClick={handleClick}/>
                        </div>
                        <div className="flex  items-center text-center text-lg font-medium text-white cursor-pointer">
                            {user.fullname}
                        </div>
                        </div>
                       <div className=" w-[100%] h-[100%]  cursor-pointer text-white flex items-center py-2 px-2  " onClick={handleLogout}>
                        <BiLogOut className="w-[20px] h-[20px] mx-2"/>  <div className="text-base">Logout</div>
                        </div> 
                        </div> 
                      :<></>
                    }
                </div>
                  
        </div>
    )
}
