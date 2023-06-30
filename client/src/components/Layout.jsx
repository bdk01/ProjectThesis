import { useState, useEffect } from 'react';
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { FaWpforms } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";
import { SiGooglemeet} from "react-icons/si";
import { useSelector } from 'react-redux';
import StatusModal from './Modal/StatusModal';
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";

const LeftNavItem = [
  {
    index:1,
    icon: (
      <svg
      viewBox="0 0 1024 1024"
      fill="black"
       className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
    ),
    iconActive: (
     <svg
      viewBox="0 0 1024 1024"
      fill="black"
    className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
    ),
    path: 'home',
    name: 'Home',
    subIcon: [],
  },
  {
    index: 2,
    icon: (
        <svg
     fill="black" viewBox="2 -4 25 30"  className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"

    >
      <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
    </svg>
    ),
    iconActive: (
     <svg
        fill="black" viewBox="2 -4 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"

    >
      <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
    </svg>
    ),
    path: 'conversation',
    name: 'Conversation',
    subIcon: [],
  },
 
  
  {
    index: 3,
    icon: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer'/>
    ),
    iconActive: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer'/>
    ),
    path: 'meeting',
    name: 'Meeting',
    subIcon: [],
  },
  
  
  {
    index: 4,
    icon: (
      <BsFilePerson className='w-[35px] h-[35px] cursor-pointer'/>
    ),
    iconActive: (
      <BsFilePerson className='w-[35px] h-[35px] cursor-pointer'/>
    ),
    path: 'review-ta',
    name: 'Information Ta',
    subIcon: [],
  },

];
const AdminNavItem = [
  {
    index:1,
    icon: (
      <svg
      viewBox="0 0 1024 1024"
      fill="black"
 
  className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
    ),
    iconActive: (
     <svg
      viewBox="0 0 1024 1024"
      fill="black"
 
    className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
    ),
    path: 'home',
    name: 'Home',
    subIcon: [],
  },
 
 
  {
    index: 2,
    icon: (
      <svg fill="none" viewBox="0 -2 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer" >
      <path fill="black" d="M8 9a1 1 0 100 2h8a1 1 0 100-2H8z" />
      <path
        fill="black"
        fillRule="evenodd"
        d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zM5 18V7h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
    ),
    iconActive: (
      <svg fill="none" viewBox="0 -2 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer" >
      <path fill="black" d="M8 9a1 1 0 100 2h8a1 1 0 100-2H8z" />
      <path
        fill="black"
        fillRule="evenodd"
        d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zM5 18V7h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
    ),
    path: 'manage-user',
    name: 'Manage User',
    subIcon: [],
  },
  
  
  {
    index: 3,
    icon: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer'/>
    ),
    iconActive: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer'/>
    ),
    path: 'review-subject',
    name: 'Review subject',
    subIcon: [],
  },

];
const TeacherNavItem = [
  {
    index: 1,
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        fill="black"
     className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
      >
        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
      </svg>
    ),
    iconActive: (
      <svg
        viewBox="0 0 1024 1024"
        fill="black"
        className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
      >
        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
      </svg>
    ),
    path: 'home',
    name: 'Home',
    subIcon: [],
  },
  {
    index: 2,
    icon: (
      <svg
        /*   viewBox="0 0 24 24"
          fill="currentColor" */
        fill="black" viewBox="2 -4 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"

      >
        <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
      </svg>
    ),
    iconActive: (
      <svg
        /*   viewBox="0 0 24 24"
          fill="currentColor" */
        fill="black" viewBox="2 -4 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"

      >
        <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
      </svg>
    ),
    path: 'conversation',
    name: 'Conversation',
    subIcon: [],
  },

  {
    index: 3,
    icon: (
      <svg fill="none" viewBox="0 -2 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer" >
        <path fill="black" d="M8 9a1 1 0 100 2h8a1 1 0 100-2H8z" />
        <path
          fill="black"
          fillRule="evenodd"
          d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zM5 18V7h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    iconActive: (
      <svg fill="none" viewBox="0 -2 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer" >
        <path fill="black" d="M8 9a1 1 0 100 2h8a1 1 0 100-2H8z" />
        <path
          fill="black"
          fillRule="evenodd"
          d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zM5 18V7h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    path: 'create-schedule',
    name: 'Create-meeting',
    subIcon: [],
  },
  {
    index: 4,
    icon: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer' />
    ),
    iconActive: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'meeting',
    name: 'Meeting',
    subIcon: [],
  },
  {
    index: 5,
    icon: (
      <FaWpforms className='w-[35px] h-[35px] cursor-pointer' />
    ),
    iconActive: (
      <FaWpforms className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'createTaSchedule',
    name: 'TaSchedule',
    subIcon: [],
  },
  {
    index: 6,
    icon: (
      <FaUserGraduate className='w-[35px] h-[35px] cursor-pointer' />
    ),
    iconActive: (
      <FaUserGraduate className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'manageTA',
    name: 'manageTA',
    subIcon: [],
  },
  {
    index: 7,
    icon: (
      <AiOutlineSchedule className='w-[35px] h-[35px] cursor-pointer' />
    
    ),
    iconActive: (
      <AiOutlineSchedule className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'manageTaSchedule',
    name: 'Schedule',
    subIcon: [],
  },
  
 
  

];
const TaNavItem = [
  {
    index: 1,
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        fill="black"
        className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
      >
        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
      </svg>
    ),
    iconActive: (
      <svg
        viewBox="0 0 1024 1024"
        fill="black"
        className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"
      >
        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
      </svg>
    ),
    path: 'home',
    name: 'Home',
    subIcon: [],
  },
  {
    index: 2,
    icon: (
      <svg
        /*   viewBox="0 0 24 24"
          fill="currentColor" */
        fill="black" viewBox="2 -4 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"

      >
        <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
      </svg>
    ),
    iconActive: (
      <svg
        /*   viewBox="0 0 24 24"
          fill="currentColor" */
        fill="black" viewBox="2 -4 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer"

      >
        <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
      </svg>
    ),
    path: 'conversation',
    name: 'Conversation',
    subIcon: [],
  },
  {
    index: 3,
    icon: (
      <svg fill="none" viewBox="0 -2 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer" >
        <path fill="black" d="M8 9a1 1 0 100 2h8a1 1 0 100-2H8z" />
        <path
          fill="black"
          fillRule="evenodd"
          d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zM5 18V7h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    iconActive: (
      <svg fill="none" viewBox="0 -2 25 30" className="w-[35px] h-[35px] text-gray-500 transition duration-75 cursor-pointer" >
        <path fill="black" d="M8 9a1 1 0 100 2h8a1 1 0 100-2H8z" />
        <path
          fill="black"
          fillRule="evenodd"
          d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zM5 18V7h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    path: 'create-schedule',
    name: 'Create-meeting',
    subIcon: [],
  },
  {
    index: 4,
    icon: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer' />
    ),
    iconActive: (
      <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'meeting',
    name: 'Meeting',
    subIcon: [],
  },
  /* {
    index: 5,
    icon: (
      <FaWpforms className='w-[35px] h-[35px] cursor-pointer' />
    ),
    iconActive: (
      <FaWpforms className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'createTaSchedule',
    name: 'TaSchedule',
    subIcon: [],
  }, */
  {
    index: 5,
    icon: (
      <BsFilePerson className='w-[35px] h-[35px] cursor-pointer' />
    ),
    iconActive: (
      <BsFilePerson className='w-[35px] h-[35px] cursor-pointer' />
    ),
    path: 'review-ta',
    name: 'Information Ta',
    subIcon: [],
  },

]

function Layout({children}) {
    const {status} = useSelector(state=>state.status)
    const {auth} = useSelector(state=>state)
  /* const { signout } = useAuth(); */
  const navigate = useNavigate();
  /* const { user } = useAuth(); */

  const { pathname } = useLocation();
  const [teacher, setTeacher] = useState(false)
  const [user, setUser] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [ta, setTa] = useState(false)
  const [opened, setOpened] = useState(true);
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

/*   const onSignout = async () => {
    await signout();
    navigate('/sign-in', { replace: true });
  }; */

  return (
    <div className="relative flex flex-col">
      {status && <StatusModal />}
      <div className='flex fixed z-20 w-[100%]'>

         <Header setOpened={setOpened} opened={opened}  />
      </div>
    <div className="flex h-[100vh] mt-[56px]">
      <div className='fixed'>

      <aside
        className={`${
          opened ? 'w-[170px]' : 'w-[70px]'
        } relative transition-all duration-500 `}
        aria-label="Sidebar"
      >
        
        <div className="overflow-y-auto py-[12px]   pl-2 pr-2 mr-1 bg-white h-[100vh]">
          <ul className="space-y-2 flex justify-start flex-col">
            {teacher && 
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
              user &&
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
              ta &&
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
          
          </ul>
        </div>
      </aside>
      </div>
        <div className={`${opened ? 'w-[170px]' : 'w-[70px]'
          }  transition-all duration-500 z-[-30]`}> 
        
      </div>{/* ${opened ? 'max-w-[300px]' : 'max-w-[700px]' } */}
        <div className={`overflow-x-auto flex flex-col flex-1 ml-[10px] bg-[#F0F3F6] mt-2 `}>            
                       {children}     
        {/*   <Outlet /> */}
                          
      </div>
    </div>
    </div>
  );
}

export default Layout;
