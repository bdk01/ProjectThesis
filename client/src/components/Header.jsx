import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from '../axios'
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../api/authAPI";
import { BiLogOut} from "react-icons/bi";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import NotifyModal from "./Modal/NotifyModal";
import { SearchBar } from "./Search/SearchBar";
import { SearchResultsList } from "./Search/SearchResultsList";



export default function Header({setOpened ,opened}) {
  const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [avatar,setAvatar] = useState('')
  const [input, setInput] = useState("");
  const {user} = useSelector(state => state.auth)
  const {notify} = useSelector(state => state)
  const [results, setResults] = useState([]);
  useEffect(()=>{
  
    setAvatar(user.avatar)
  },[user])
    // Function
       const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);
        try {
          const res = await axios.get(`/api/user/search?username=${search}`)
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
    
        <div className=" bg-white z-[100] grid grid-cols-8 p-2 w-[100%]  border-b-[1px] border-black ">
                <div className="col-span-2 flex justify-start items-center">
                  <div    type="button" onClick={() => setOpened(!opened)} >

                  <AiOutlineMenu className=" w-[30px] h-[30px] cursor-pointer mr-6 ml-2"   />
                  </div>
                  <Link to="/home" className="logo m-w-[130px]">
                      <img className="text-white text-2xl " src="https://socialite-template.netlify.app/assets/images/logo.png"
                      onClick={() => window.scrollTo({top: 0})}>
                        
                      </img>
                  </Link>

                </div>
                <div className="col-span-4" >
                {/*  <form className="w-[100%]" onSubmit={handleSearch} >
                    <input type="text" value={search} className="w-[75%] bg-gray-200 rounded-full border-none outline-none py-2 px-3 text-[#424242]" 
                    placeholder="Enter to Search..."
                    onChange={e => setSearch(e.target.value)} />

                    <button type="submit" style={{display: 'none'}}>Search</button>
                 </form> */}
        <SearchBar results={results} setResults={setResults} setInput={setInput} input={input} />
        {results && results.length > 0 && <SearchResultsList results={results} setResults={setResults} setInput={setInput} />}
       {/*  <div class="">
          <div class="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1" />
            <button
              class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div> */}
        {/*  */}
                </div>

                <div className="col-span-2  flex justify-center items-center  relative">
        <div className="flex-row flex ">
                        {/*  */}
                           <div className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                      {/*   <span className="material-icons" 
                        style={{color: notify?.data.length > 0 ? 'crimson' : ''}}>
                            favorite
                        </span> */}
            {
                avatar ?
              <AiOutlineBell className={`${notify?.data.length > 0 ? 'text-red-900 fill-red-900 ' : ''
                }  w-[25px] h-[25px]   cursor-pointer`} >
                    </AiOutlineBell>
                :<></>
            }
              {/*   <span className="text-red-700 absolute top-0 right-[16px]">{notify?.data.length}</span> */}
                      

                    </span>
          
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                    style={{transform: 'translateX(75px)'}}>
                        <NotifyModal />
                    </div>
                        
                </div> 
              {/*   /qweqw */}
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
                      <div className=" w-[200px] h-[120px]  absolute top-[102%] right-[0%] rounded-md flex flex-col "  >
              <div id="dropdownAvatar" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-bold text-lg text-gray-700 only:bg-gray-100 truncate">{user.fullname}</div>
                  <div className="font-medium text-gray-700 only:bg-gray-100 truncate">{user.username}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
               
                  <li>
                    <Link to={`/profile/${user._id}`} className="block px-4 py-2  text-gray-700 only:bg-gray-100">Profile</Link>
                  </li>
                 {/*  <li>
                    <a href="#" className="block px-4 py-2 text-gray-700 only:bg-gray-100">Earnings</a>
                  </li> */}
                </ul>
                <div className="py-2">
                  <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 only:bg-gray-100 ">Sign out</a>
                </div>
              </div>
                        </div> 
                      :<></>
                    }
                </div>
                  
        </div>
    )
}
