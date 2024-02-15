import React, { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from '../../axios'
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../api/authAPI";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import NotifyModal from "../Modal/NotifyModal";
import { SearchBar } from "../Search/SearchBar";
import { SearchResultsList } from "../Search/SearchResultsList";
import Delayed from "../../hooks/DeplayShow";
import vn from "../../assets/img/vn.svg"
import usa from "../../assets/img/usa.svg"
import i18n from "i18next";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TA from "../../assets/img/TAIMG.jfif"

export default function Header({ setOpened, opened, openedMobile, setOpenedMobile, setLanguage, language }) {
  const [search, setSearch] = useState('')
  const { Option } = Select;
  const [searchUsers, setSearchUsers] = useState([])
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)
  const [input, setInput] = useState("");
  const { user } = useSelector(state => state.auth)
  const { notify } = useSelector(state => state)
  const [results, setResults] = useState([]);
  useEffect(() => {
    /*    if(!user&&!avatar){
         setIsLogin(false)
       } */

    setAvatar(user.avatar)

  }, [user])
  useEffect(() => {
    if (!user) {
      /*   setTimeout(()=>{ */

      setIsLogin(false)
      /*  },2000) */
    }
    else if (user) {
      /* setTimeout(()=>{ */


      setIsLogin(true)
      /*  },2000) */
    }
  }, [user])
  // Function
  const handleSearch = async e => {
    e.preventDefault()
    if (!search) return setSearchUsers([]);
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
  const handleClick = e => {
    e.preventDefault()
    setOpen(!open)
  }
  const handleLogout = e => {
    e.preventDefault()
    Logout(dispatch)
    console.log("logout")
    setOpen(false)


  }
  function handleChange(value) {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
    i18n.changeLanguage(value.key);
    localStorage.setItem("language", value.key);
    setLanguage(value.key)
  }
  return (


    <div className=" bg-white z-[20] grid grid-cols-9 p-1 w-[100%]  border-b-[1px] border-black ">
      <div className="col-span-2 flex justify-start items-center">
        <div type="button" onClick={() => setOpened(!opened)} >

          <AiOutlineMenu className="hidden sm:block w-[30px] h-[30px] cursor-pointer mr-6 ml-2" />
        </div>
        <div type="button" onClick={() => setOpenedMobile(!openedMobile)} >

          <AiOutlineMenu className="sm:hidden w-[30px] h-[30px] cursor-pointer mr-6 ml-2 " />
        </div>
        <Link to="/home" className="logo hidden sm:block m-w-[50px]">
          {/*  <img className="text-white text-2xl h-[50px] w-[60px]" src={TA} loading="lazy" alt="#" >
                    
                        
                      </img> */}
          <LazyLoadImage
            placeholderSrc={TA}

            key="#"
            onClick={() => window.scrollTo({ top: 0 })}
            alt='home'
            height={30}
            src={TA}
            width={40} />
        </Link>


      </div>
      <div className="col-span-5" >

        <SearchBar results={results} setResults={setResults} setInput={setInput} input={input} />
        {results && results.length > 0 && <SearchResultsList results={results} setResults={setResults} setInput={setInput} />}

        {/*  */}
      </div>


      <div className="col-span-2  flex justify-center items-center  relative">
        <div className="flex-row flex items-center">
          <Suspense>
            <Select
              labelInValue
              defaultValue={localStorage.getItem('language') || 'en'}
              className="ml-[6px] text-sm rounded-lg  items-center hidden sm:flex"
              style={{
                width: 71,


              }}
              onChange={handleChange}
            >
              <Option value="en" >{/* <img loading="lazy" src={usa} alt='usa' width={30} height={30} /> */}
                <LazyLoadImage
                  placeholderSrc={usa}
                  /* effect="blur" */
                  key="usa"
                  alt='usa'
                  height={29}
                  src={usa}
                  width={29} />
              </Option>
              <Option value="vi">
                <LazyLoadImage
                  placeholderSrc={vn}
                  /*  effect="blur" */
                  key="vn"
                  alt='vn'
                  height={29}
                  src={vn}
                  width={29} />
              </Option>
            </Select>

          </Suspense>

          <div className="nav-item dropdown" style={{ opacity: 1 }} >
            <span className="nav-link position-relative" id="navbarDropdown"
              role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

              {
                avatar ?
                  <AiOutlineBell className={`${notify?.data.length > 0 ? 'text-red-900 fill-red-900 ' : ''
                    }  w-[25px] h-[25px]   cursor-pointer`} >
                  </AiOutlineBell>
                  : <></>
              }
              {/*   <span className="text-red-700 absolute top-0 right-[16px]">{notify?.data.length}</span> */}


            </span>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown"
              style={{ transform: 'translateX(75px)' }}>
              <NotifyModal />
            </div>

          </div>

          {
            user ?


              <div className=" flex justify-end w-[40px] h-[40px]  ">
                <img src={avatar} className=" w-[100%] h-[100%] rounded-[50%]" onClick={handleClick} />
              </div>


              :
              <Delayed>

                <div className="flex justify-center items-center">
                  <Link to="/login" className="font-semibold text-black mr-3">
                    Đăng nhập
                  </Link>
                  <Link to="/login" className="font-semibold text-black">
                    Đăng Ký
                  </Link>
                </div>
              </Delayed>
          }



        </div>
        {
          open ?
            <div className=" w-[150px] h-[120px]  absolute top-[102%] right-[0%] rounded-md flex flex-col "  >
              <div id="dropdownAvatar" className="z-10 w-[100px] bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600">
                {/*  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-bold text-lg text-gray-700 only:bg-gray-100 truncate">{user.fullname}</div>
                  <div className="font-medium text-gray-700 only:bg-gray-100 truncate">{user.username}</div>
                </div> */}
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                  {/*  <Suspense  fallback={<p>qweqwe</p>}> */}
                  <li>
                    <Link to={`/profile/${user._id}`} className="block pl-4  py-2  text-gray-700 only:bg-gray-100">{t('Profile')}</Link>
                  </li>
                  {/*   </Suspense> */}
                </ul>
                <div className="py-2">
                  <button onClick={handleLogout} className="block pl-4  py-2 text-sm text-gray-700 only:bg-gray-100 ">{t('Sign out')}</button>
                </div>
              </div>
            </div>
            : <></>
        }
      </div>

    </div>

  )
}
