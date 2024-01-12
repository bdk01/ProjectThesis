
import { FaWpforms } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";
import { SiGooglemeet} from "react-icons/si";

import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";



export const LeftNavItem = [
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

export const LeftNavItemVi = [
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
      name: 'Trang chủ',
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
      name: 'Trò chuyện',
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
      name: 'Gặp gỡ',
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
      name: 'Thông tin TA',
      subIcon: [],
    },
  
  ];



 export const AdminNavItem = [
    
   
   
    {
      index: 1,
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
      index: 2,
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

 export const AdminNavItemVi = [
    
   
   
    {
      index: 1,
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
      name: 'Quản lý người dùng',
      subIcon: [],
    },
    
    
    {
      index: 2,
      icon: (
        <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer'/>
      ),
      iconActive: (
        <SiGooglemeet className='w-[35px] h-[35px] cursor-pointer'/>
      ),
      path: 'review-subject',
      name: 'Thông tin môn',
      subIcon: [],
    },
  
  ];
 export const TeacherNavItem = [
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
 export const TeacherNavItemVi = [
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
      name: 'Trang chủ',
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
      name: 'Trò chuyện',
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
      name: 'Tạo group',
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
      name: 'Gặp gỡ',
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
      name: 'Tạo form TA',
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
      name: 'Quản lý TA',
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
      name: 'Quản lý đăng ký',
      subIcon: [],
    },
    
   
    
  
  ];
 export const TaNavItem = [
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
        <BsFilePerson className='w-[35px] h-[35px] cursor-pointer' />
      ),
      iconActive: (
        <BsFilePerson className='w-[35px] h-[35px] cursor-pointer' />
      ),
      path: 'review-ta',
      name: 'Information TA',
      subIcon: [],
    },
  
  ]
  
 export const TaNavItemVi = [
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
      name: 'Trang chủ',
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
      name: 'Trò chuyện',
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
      name: 'Tạo nhóm',
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
      name: 'Gặp gỡ',
      subIcon: [],
    },
  
    {
      index: 5,
      icon: (
        <BsFilePerson className='w-[35px] h-[35px] cursor-pointer' />
      ),
      iconActive: (
        <BsFilePerson className='w-[35px] h-[35px] cursor-pointer' />
      ),
      path: 'review-ta',
      name: 'Thông tin TA',
      subIcon: [],
    },
  
  ]
  