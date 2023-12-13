import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FaWpforms } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";
import { useSelector } from 'react-redux';

import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';


const AdminNavItem = [



    {
        index: 1,
        icon: (
            <div  className=" flex items-center h-[28px] justify-center text-gray-500 transition duration-75 cursor-pointer">

                <img className="text-white   h-[28px]" src="https://socialite-template.netlify.app/assets/images/logo.png"
              />
            </div>
        ),
        iconActive: (
            <div  className="flex items-center justify-center  text-gray-500 transition duration-75 cursor-pointer">

        </div>
        ),
        path: '/home',
       
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
            <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer' />
        ),
        iconActive: (
            <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer' />
        ),
        path: 'review-subject',
        name: 'Review subject',
        subIcon: [],
    },

];



function LayoutAdmin({ children }) {

    const { auth } = useSelector(state => state)
    /* const { signout } = useAuth(); */
    const navigate = useNavigate();
    /* const { user } = useAuth(); */

    const { pathname } = useLocation();

    const [admin, setAdmin] = useState(false)

    const [opened, setOpened] = useState(true);
    const [openedMobile, setOpenedMobile] = useState(false);
    useEffect(() => {

        if (auth.user.role === 'admin') {
            setAdmin(true)
        }
    }, [auth.user])


    return (
        <div className="relative flex flex-col">

        {/*     <div className='flex fixed z-20 w-[100%]'>
           

            </div> */}
            <div className="flex h-[100vh] ">
                <div className='fixed'>
              
                    <aside
                        className={`${opened ? 'w-[170px]' : 'w-[70px]'
                            } relative transition-all duration-500 `}
                        aria-label="Sidebar"
                    >

                        <div className="overflow-hidden py-[4px]  hidden sm:block pl-2 pr-2 mr-1 bg-white h-[100vh]">
                            <ul className="space-y-2 flex justify-start flex-col">

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



                            </ul>
                        </div>
                    </aside>

                </div>
                <div className={`${opened ? 'w-[170px]' : 'w-[70px]'
                    } hidden sm:block transition-all duration-500 z-[-30]`}>

                </div>
                <div className={`overflow-hidden flex flex-col flex-1   sm:mr-2 bg-white mt-2 `}>
                <HeaderAdmin setOpened={setOpened} opened={opened} openedMobile={openedMobile} setOpenedMobile={setOpenedMobile} />
                    {children}
                    <Outlet />

                </div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
