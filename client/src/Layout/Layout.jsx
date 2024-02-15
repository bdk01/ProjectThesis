import { useState, useEffect, Suspense } from 'react';
import {  Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FaWpforms } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";
import { SiGooglemeet} from "react-icons/si";
import { useSelector } from 'react-redux';
import StatusModal from '../components/Modal/StatusModal';
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import Header from '../components/Header/Header';
import { useTranslation } from 'react-i18next';
import { AdminNavItem, LeftNavItem, LeftNavItemVi, TaNavItem, TaNavItemVi, TeacherNavItem, TeacherNavItemVi } from './LayoutNavbar';


function Layout({children}) {
    const {status} = useSelector(state=>state.status)
    const {auth} = useSelector(state=>state)
  /* const { signout } = useAuth(); */
  const navigate = useNavigate();
  /* const { user } = useAuth(); */
  const [language,setLanguage] = useState()
  const { pathname } = useLocation();
  const [teacher, setTeacher] = useState(false)
  const [user, setUser] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [ta, setTa] = useState(false)
  const [opened, setOpened] = useState(true);
  const [openedMobile, setOpenedMobile] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('language')){
    
      const gg=  localStorage.getItem('language')
       setLanguage(gg)
    }
    else if(!localStorage.getItem('language')){
      setLanguage('en')
    }
  },[])
  useEffect(() => {
    if (auth.user.role === 'teacher' ) {
      setTeacher(true)
    } 
    else if (auth.user.role === 'user') {
      setUser(true)
    } 
    else if (auth.user.role === 'ta') {
      setTa(true)
    } 
    else if (auth.user.role === 'admin') {
      setAdmin(true)
    } 
  }, [auth.user])



  return (
    <div className="relative flex flex-col">
      {status && <StatusModal />}
      <div className='flex fixed z-20 w-[100%]'>
    <Suspense fallback={<h2>Loading...</h2>}>

         <Header language={language} setLanguage={setLanguage} setOpened={setOpened} opened={opened} openedMobile={openedMobile} setOpenedMobile={setOpenedMobile} />
    </Suspense>
         <ul className={` border-t-[1px] sm:hidden border-gray-300 md:pb-1 grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 absolute  bg-white md:z-auto  left-0 w-full   pl-9 transition-all duration-500  ${openedMobile ? 'top-[60px] z-10 ease-out':'ease-in top-[-490px] z-10 opacity-5 '}`}>
    {
      ta && language=='en' ?   <><li  className='text-lg my-2 col-span-1'>
      <Link to="/home" className='text-black hover:text-gray-400 duration-500'>Home</Link>
    </li>
    <li  className='text-lg my-2 col-span-1'>
      <Link to="/conversation" className='text-black hover:text-gray-400 duration-500'>Conversation</Link>
    </li>
    <li  className='text-lg my-2 col-span-1'>
      <Link to="/create-schedule"className='text-black hover:text-gray-400 duration-500'>Create Meeting </Link>
    </li>
    <li  className='text-lg my-2 col-span-1'>
      <Link to="/meeting" className='text-black hover:text-gray-400 duration-500'> Meeting </Link>
    </li>
    <li  className='text-lg my-2 col-span-1'>
      <Link to="/review-ta" className='text-black hover:text-gray-400 duration-500'> Information TA </Link>
    </li></>  
    : 
     <><li  className='text-lg my-2 col-span-1'>
    <Link to="/home" className='text-black hover:text-gray-400 duration-500'>Trang chủ</Link>
  </li>
  <li  className='text-lg my-2 col-span-1'>
    <Link to="/conversation" className='text-black hover:text-gray-400 duration-500'>Trò Chuyện</Link>
  </li>
  <li  className='text-lg my-2 col-span-1'>
    <Link to="/create-schedule"className='text-black hover:text-gray-400 duration-500'>Tạo group</Link>
  </li>
  <li  className='text-lg my-2 col-span-1'>
    <Link to="/meeting" className='text-black hover:text-gray-400 duration-500'> Gặp gỡ </Link>
  </li>
  <li  className='text-lg my-2 col-span-1'>
    <Link to="/review-ta" className='text-black hover:text-gray-400 duration-500'> Thông tin TA </Link>
  </li></>  
    }    

     
       
         </ul>
      </div>
    <div className="flex h-[100vh] mt-[56px]">
      <div className='fixed'>
<Suspense fallback={<h2>Loading...</h2>}>


      <aside
        className={`${
          opened ? 'w-[170px]' : 'w-[70px]'
        } relative transition-all duration-500 `}
        aria-label="Sidebar"
      >
        
        <div className="overflow-y-auto py-[12px]  hidden sm:block pl-2 pr-2 mr-1 bg-white h-[100vh]">
          <ul className="space-y-2 flex justify-start flex-col">
            {teacher && language=='en' && 
                  TeacherNavItem.map((item) => (
                    <li key={item.index}>
                      <div
                        /*  type="button" */
                        onClick={() =>
                          item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                        href="#"
                        className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                          item.subIcon.length === 0
                          ? 'bg-gray-400'
                          : ''
                          } `}
                      >
                        {pathname.indexOf(item.path) !== -1
                          ? item.iconActive
                          : item.icon}
                        {opened ? (
                          <>
                            <span className="ml-2 whitespace-nowrap cursor-pointer">
                              {item.name}
                            </span>
                            <div
                              className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'opacity-100'
                                : ''
                                }  absolute right-[-12px]`}
                            />
                          </>
                        ) : null}
                      </div>
                      {item.subIcon.length > 0 &&
                        item.subIcon.map((s) => (
                          <div className="ml-[20px]" key={item.index}>
                            <ul>
                              <li>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/}`, { replace: true })}
                                  href="#"
                                  className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                    } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                      ? 'bg-gray-400'
                                      : ''
                                    } `}
                                >
                                  {pathname.indexOf(s.path) !== -1
                                    ? s.iconActive
                                    : s.icon}

                                  {opened ? (
                                    <>
                                      <span className="ml-1 whitespace-nowrap">
                                        {s.name}
                                      </span>
                                      <div
                                        className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                          ? 'opacity-100'
                                          : ''
                                          }  absolute right-[-12px]`}
                                      />
                                    </>
                                  ) : null}
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))}
                    </li>
                  ))
            }
            {teacher && language=='vi' && 
                  TeacherNavItemVi.map((item) => (
                    <li key={item.index}>
                      <div
                        /*  type="button" */
                        onClick={() =>
                          item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                        href="#"
                        className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                          item.subIcon.length === 0
                          ? 'bg-gray-400'
                          : ''
                          } `}
                      >
                        {pathname.indexOf(item.path) !== -1
                          ? item.iconActive
                          : item.icon}
                        {opened ? (
                          <>
                            <span className="ml-2 whitespace-nowrap cursor-pointer">
                              {item.name}
                            </span>
                            <div
                              className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'opacity-100'
                                : ''
                                }  absolute right-[-12px]`}
                            />
                          </>
                        ) : null}
                      </div>
                      {item.subIcon.length > 0 &&
                        item.subIcon.map((s) => (
                          <div className="ml-[20px]" key={item.index}>
                            <ul>
                              <li>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/}`, { replace: true })}
                                  href="#"
                                  className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                    } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                      ? 'bg-gray-400'
                                      : ''
                                    } `}
                                >
                                  {pathname.indexOf(s.path) !== -1
                                    ? s.iconActive
                                    : s.icon}

                                  {opened ? (
                                    <>
                                      <span className="ml-1 whitespace-nowrap">
                                        {s.name}
                                      </span>
                                      <div
                                        className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                          ? 'opacity-100'
                                          : ''
                                          }  absolute right-[-12px]`}
                                      />
                                    </>
                                  ) : null}
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))}
                    </li>
                  ))
            }
                {admin &&
                  AdminNavItem.map((item) => (
                    <li key={item.index}>
                      <div
                        /*  type="button" */
                        onClick={() =>
                          item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                        href="#"
                        className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                          item.subIcon.length === 0
                          ? 'bg-gray-400'
                          : ''
                          } `}
                      >
                        {pathname.indexOf(item.path) !== -1
                          ? item.iconActive
                          : item.icon}
                        {opened ? (
                          <>
                            <span className="ml-2 whitespace-nowrap cursor-pointer">
                              {item.name}
                            </span>
                            <div
                              className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'opacity-100'
                                : ''
                                }  absolute right-[-12px]`}
                            />
                          </>
                        ) : null}
                      </div>
                      {item.subIcon.length > 0 &&
                        item.subIcon.map((s) => (
                          <div className="ml-[20px]" key={item.index}>
                            <ul>
                              <li>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/}`, { replace: true })}
                                  href="#"
                                  className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                    } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                      ? 'bg-gray-400'
                                      : ''
                                    } `}
                                >
                                  {pathname.indexOf(s.path) !== -1
                                    ? s.iconActive
                                    : s.icon}

                                  {opened ? (
                                    <>
                                      <span className="ml-1 whitespace-nowrap">
                                        {s.name}
                                      </span>
                                      <div
                                        className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                          ? 'opacity-100'
                                          : ''
                                          }  absolute right-[-12px]`}
                                      />
                                    </>
                                  ) : null}
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))}
                    </li>
                  ))
                }
            {
              user && language=='en'&&
                      LeftNavItem.map((item) => (
                        <li key={item.index}>
                          <div
                            /*  type="button" */
                            onClick={() =>
                              item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                            href="#"
                            className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'bg-gray-400'
                                : ''
                              } `}
                          >
                            {pathname.indexOf(item.path) !== -1
                              ? item.iconActive
                              : item.icon}
                            {opened ? (
                              <>
                                <span className="ml-2 whitespace-nowrap cursor-pointer">
                                  {item.name}
                                </span>
                                <div
                                  className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                      item.subIcon.length === 0
                                      ? 'opacity-100'
                                      : ''
                                    }  absolute right-[-12px]`}
                                />
                              </>
                            ) : null}
                          </div>
                          {item.subIcon.length > 0 &&
                            item.subIcon.map((s) => (
                              <div className="ml-[20px]" key={item.index}>
                                <ul>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(`/}`, { replace: true })}
                                      href="#"
                                      className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                        } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                          ? 'bg-gray-400'
                                          : ''
                                        } `}
                                    >
                                      {pathname.indexOf(s.path) !== -1
                                        ? s.iconActive
                                        : s.icon}

                                      {opened ? (
                                        <>
                                          <span className="ml-1 whitespace-nowrap">
                                            {s.name}
                                          </span>
                                          <div
                                            className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                                ? 'opacity-100'
                                                : ''
                                              }  absolute right-[-12px]`}
                                          />
                                        </>
                                      ) : null}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ))}
                        </li>
                      ))
                    
              
            }
            {
              user && language=='vi'&&
                      LeftNavItemVi.map((item) => (
                        <li key={item.index}>
                          <div
                            /*  type="button" */
                            onClick={() =>
                              item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                            href="#"
                            className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'bg-gray-400'
                                : ''
                              } `}
                          >
                            {pathname.indexOf(item.path) !== -1
                              ? item.iconActive
                              : item.icon}
                            {opened ? (
                              <>
                                <span className="ml-2 whitespace-nowrap cursor-pointer">
                                  {item.name}
                                </span>
                                <div
                                  className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                      item.subIcon.length === 0
                                      ? 'opacity-100'
                                      : ''
                                    }  absolute right-[-12px]`}
                                />
                              </>
                            ) : null}
                          </div>
                          {item.subIcon.length > 0 &&
                            item.subIcon.map((s) => (
                              <div className="ml-[20px]" key={item.index}>
                                <ul>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(`/}`, { replace: true })}
                                      href="#"
                                      className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                        } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                          ? 'bg-gray-400'
                                          : ''
                                        } `}
                                    >
                                      {pathname.indexOf(s.path) !== -1
                                        ? s.iconActive
                                        : s.icon}

                                      {opened ? (
                                        <>
                                          <span className="ml-1 whitespace-nowrap">
                                            {s.name}
                                          </span>
                                          <div
                                            className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                                ? 'opacity-100'
                                                : ''
                                              }  absolute right-[-12px]`}
                                          />
                                        </>
                                      ) : null}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ))}
                        </li>
                      ))
                    
              
            }
            {
              ta && language =='en' &&
                      TaNavItem.map((item) => (
                        <li key={item.index}>
                          <div
                            /*  type="button" */
                            onClick={() =>
                              item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                            href="#"
                            className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'bg-gray-400'
                                : ''
                              } `}
                          >
                            {pathname.indexOf(item.path) !== -1
                              ? item.iconActive
                              : item.icon}
                            {opened ? (
                              <>
                                <span className="ml-2 whitespace-nowrap cursor-pointer">
                                  {item.name}
                                </span>
                                <div
                                  className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                      item.subIcon.length === 0
                                      ? 'opacity-100'
                                      : ''
                                    }  absolute right-[-12px]`}
                                />
                              </>
                            ) : null}
                          </div>
                          {item.subIcon.length > 0 &&
                            item.subIcon.map((s) => (
                              <div className="ml-[20px]" key={item.index}>
                                <ul>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(`/}`, { replace: true })}
                                      href="#"
                                      className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                        } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                          ? 'bg-gray-400'
                                          : ''
                                        } `}
                                    >
                                      {pathname.indexOf(s.path) !== -1
                                        ? s.iconActive
                                        : s.icon}

                                      {opened ? (
                                        <>
                                          <span className="ml-1 whitespace-nowrap">
                                            {s.name}
                                          </span>
                                          <div
                                            className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                                ? 'opacity-100'
                                                : ''
                                              }  absolute right-[-12px]`}
                                          />
                                        </>
                                      ) : null}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ))}
                        </li>
                      ))
                    
              
            }
            {
              ta && language =='vi' &&
                      TaNavItemVi.map((item) => (
                        <li key={item.index}>
                          <div
                            /*  type="button" */
                            onClick={() =>
                              item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true })}
                            href="#"
                            className={`flex ring-0 relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(item.path) !== -1 &&
                                item.subIcon.length === 0
                                ? 'bg-gray-400'
                                : ''
                              } `}
                          >
                            {pathname.indexOf(item.path) !== -1
                              ? item.iconActive
                              : item.icon}
                            {opened ? (
                              <>
                                <span className="ml-2 whitespace-nowrap cursor-pointer">
                                  {item.name}
                                </span>
                                <div
                                  className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(item.path) !== -1 &&
                                      item.subIcon.length === 0
                                      ? 'opacity-100'
                                      : ''
                                    }  absolute right-[-12px]`}
                                />
                              </>
                            ) : null}
                          </div>
                          {item.subIcon.length > 0 &&
                            item.subIcon.map((s) => (
                              <div className="ml-[20px]" key={item.index}>
                                <ul>
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(`/}`, { replace: true })}
                                      href="#"
                                      className={`flex relative items-center ${opened ? 'px-[12px] py-[12px]' : ''
                                        } text-[14px] font-medium w-full text-black rounded-lg group ${pathname.indexOf(s.path) !== -1
                                          ? 'bg-gray-400'
                                          : ''
                                        } `}
                                    >
                                      {pathname.indexOf(s.path) !== -1
                                        ? s.iconActive
                                        : s.icon}

                                      {opened ? (
                                        <>
                                          <span className="ml-1 whitespace-nowrap">
                                            {s.name}
                                          </span>
                                          <div
                                            className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${pathname.indexOf(s.path) !== -1
                                                ? 'opacity-100'
                                                : ''
                                              }  absolute right-[-12px]`}
                                          />
                                        </>
                                      ) : null}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ))}
                        </li>
                      ))
                    
              
            }
          
          </ul>
        </div>
      </aside>
      </Suspense>
      </div>
        <div className={`${opened ? 'w-[170px]' : 'w-[70px]'
          } hidden sm:block transition-all duration-500 z-[-30]`}> 
        
      </div>
        <div className={`overflow-x-auto flex flex-col flex-1  sm:ml-[16px] sm:mr-2 bg-white mt-2 `}>            
                       {children}     
          <Outlet />
                          
      </div>
    </div>
    </div>
  );
}

export default Layout;
