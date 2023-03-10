import { useState, useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import Header from './Header/Header';




const LeftNavItem = [
  {
    index:1,
    icon: (
      <svg
      viewBox="0 0 1024 1024"
      fill="black"
    /*   height="1em"
      width="1em" */
    /*  fill="black" *//*  viewBox="-2 -3 25 30" */  className="w-[30px] h-[30px] text-gray-500 transition duration-75"
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
    ),
    iconActive: (
     <svg
      viewBox="0 0 1024 1024"
      fill="black"
    /*   height="1em"
      width="1em" */
    /*  fill="black" *//*  viewBox="-2 -3 25 30" */  className="w-[30px] h-[30px] text-gray-500 transition duration-75"
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
    ),
    path: 'home',
    name: 'Trang chủ',
    subIcon: [],
  },
  {
    index: 2,
    icon: (
        <svg
    /*   viewBox="0 0 24 24"
      fill="currentColor" */
     fill="black" viewBox="2 -4 25 30"  className="w-[30px] h-[35px] text-gray-500 transition duration-75"

    >
      <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
    </svg>
    ),
    iconActive: (
     <svg
    /*   viewBox="0 0 24 24"
      fill="currentColor" */
     fill="black" viewBox="2 -4 25 30"  className="w-[30px] h-[35px] text-gray-500 transition duration-75"

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
    <svg fill="none" viewBox="0 -2 25 30"  className="w-[35px] h-[35px] text-gray-500 transition duration-75" >
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
    <svg fill="none" viewBox="0 -2 25 30"  className="w-[35px] h-[35px] text-gray-500 transition duration-75" >
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
      <svg
        className="w-[30px] h-[30px] text-gray-500 transition duration-75"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        fill="black"
      >
        <path d="M14.25 25.5002V23.793C10.5248 23.5784 8.26172 21.6593 8.25 18.7502H11.625C11.708 19.9849 12.7434 20.9276 14.25 21.094V16.5002L12.9952 16.1721C10.1358 15.5074 8.60578 13.857 8.60578 11.3871C8.60578 8.47571 10.6912 6.56649 14.25 6.28149V4.50024H15.75V6.28149C19.3777 6.57681 21.3281 8.5193 21.375 11.2502H18C17.9644 10.1224 17.258 9.21634 15.75 9.09399V13.4065L17.1947 13.7477C20.2317 14.4124 21.75 15.9846 21.75 18.5627C21.75 21.5787 19.6997 23.5259 15.75 23.7809V25.5002H14.25ZM14.25 13.1252V9.09399C12.9567 9.16524 12.0342 9.95977 12.0342 11.0876C12.0342 12.1329 12.8025 12.8163 14.25 13.1252ZM15.75 16.7815V21.094C17.5383 21.0218 18.3928 20.2071 18.3928 18.9485C18.3928 17.7963 17.5383 17.0205 15.75 16.7815Z" />
      </svg>
    ),
    iconActive: (
      <svg
        className="w-[30px] h-[30px] text-gray-500 transition duration-75 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        fill="black"
      >
        <path d="M14.25 25.5002V23.793C10.5248 23.5784 8.26172 21.6593 8.25 18.7502H11.625C11.708 19.9849 12.7434 20.9276 14.25 21.094V16.5002L12.9952 16.1721C10.1358 15.5074 8.60578 13.857 8.60578 11.3871C8.60578 8.47571 10.6912 6.56649 14.25 6.28149V4.50024H15.75V6.28149C19.3777 6.57681 21.3281 8.5193 21.375 11.2502H18C17.9644 10.1224 17.258 9.21634 15.75 9.09399V13.4065L17.1947 13.7477C20.2317 14.4124 21.75 15.9846 21.75 18.5627C21.75 21.5787 19.6997 23.5259 15.75 23.7809V25.5002H14.25ZM14.25 13.1252V9.09399C12.9567 9.16524 12.0342 9.95977 12.0342 11.0876C12.0342 12.1329 12.8025 12.8163 14.25 13.1252ZM15.75 16.7815V21.094C17.5383 21.0218 18.3928 20.2071 18.3928 18.9485C18.3928 17.7963 17.5383 17.0205 15.75 16.7815Z" />
      </svg>
    ),
    path: 'meeting',
    name: 'Meeting',
    subIcon: [],
  },

];

function Main({ children }) {
  /* const { signout } = useAuth(); */
  const navigate = useNavigate();
  /* const { user } = useAuth(); */

  const { pathname } = useLocation();

  const [opened, setOpened] = useState(true);

/*   const onSignout = async () => {
    await signout();
    navigate('/sign-in', { replace: true });
  }; */

  return (
    <div className="relative flex flex-col">
   
      <div className='flex fixed z-20 w-[100%]'>

         <Header />
      </div>
    <div className="flex h-[100vh] mt-[56px]">
      <div className='fixed'>

      <aside
        className={`${
          opened ? 'w-[170px]' : 'w-[70px]'
        } relative transition-all duration-500 `}
        aria-label="Sidebar"
      >
           <button
          type="button"
          className={`absolute right-[-15px] top-[280px] cursor-pointer transition-all duration-500 ${
            opened ? '' : 'rotate-180'
          } `}
          onClick={() => setOpened(!opened)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle cx="20" cy="20" r="20" fill="#F5F5F9" />
            <circle
              cx="20"
              cy="20"
              r="13"
              fill="url(#paint0_linear_397_3239)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.8968 14L15.7144 20L21.8968 26L23.4286 24.5134L18.778 20L23.4286 15.4866L21.8968 14Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_397_3239"
                x1="20"
                y1="7"
                x2="20"
                y2="33"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFE25A" />
                <stop offset="1" stopColor="#F7C102" />
              </linearGradient>
            </defs>
          </svg>
        </button>
        <div className="overflow-y-auto py-[12px]   pl-2 pr-3 mr-1 bg-white h-[100vh]">
          <ul className="space-y-2 flex justify-start flex-col">
            {LeftNavItem.map((item) => (
              <li key={item.index}>
                <button
                  type="button"
                  onClick={() =>
                    item.subIcon.length === 0 && navigate(`/${item.path}`, { replace: true }  )}
                  href="#"
                  className={`flex relative items-center pl-[6px] mb-1 py-[8px] my-1 text-[14px] font-medium w-full text-black rounded-lg group ${
                    pathname.indexOf(item.path) !== -1 &&
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
                      <span className="ml-3 whitespace-nowrap">
                        {item.name}
                      </span>
                      <div
                        className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${
                          pathname.indexOf(item.path) !== -1 &&
                          item.subIcon.length === 0
                            ? 'opacity-100'
                            : ''
                        }  absolute right-[-12px]`}
                      />
                    </>
                  ) : null}
                </button>
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
                            className={`flex relative items-center ${
                              opened ? 'px-[12px] py-[12px]' : ''
                            } text-[14px] font-medium w-full text-black rounded-lg group ${
                              pathname.indexOf(s.path) !== -1
                                ? 'bg-gray-400'
                                : ''
                            } `}
                          >
                            {pathname.indexOf(s.path) !== -1
                              ? s.iconActive
                              : s.icon}

                            {opened ? (
                              <>
                                <span className="ml-3 whitespace-nowrap">
                                  {s.name}
                                </span>
                                <div
                                  className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-white transition duration-75 opacity-0  ${
                                    pathname.indexOf(s.path) !== -1
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
            ))}
          </ul>
        </div>
      </aside>
      </div>
        <div className={`${opened ? 'w-[170px]' : 'w-[70px]'
          }  transition-all duration-500 z-[-1]`}> 
        
      </div>
      <div className="flex flex-col flex-1 pl-[12px] bg-[#F0F3F6] mt-2 ">            
                       {children}        
                          
      </div>
    </div>
    </div>
  );
}

export default Main;
