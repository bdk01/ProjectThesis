import React from 'react'
import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { OpenStatus } from '../../redux/statusSlice'
import StatusModal from '../Modal/StatusModal'
import { useTranslation } from 'react-i18next'


const Status = ({type}) => {
  const { t } = useTranslation();
    const { auth } = useSelector(state => state)
    const  [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const handleOpen = ()=>{
        setOpen(!open)
    }
    
    return (
      <div className="bg-white py-3 px-6 flex mb-3 shadow-sm rounded-sm  ">
        {/*   <img src={auth.user.avatar} size="big-avatar" /> */}
        <div className=" flex justify-end w-[44px] h-[44px] mr-2 ">
          <img
            src={auth.user.avatar}
            className=" w-[100%] h-[100%] rounded-[50%]"
            /*   onClick={handleClick} */
          />
        </div>
        <button
          className="w-[85%] bg-gray-200 rounded-full border-none outline-none py-2 px-3 text-[#424242] text-start"
          onClick={() => dispatch(OpenStatus({ status: true }))}
        >
          {auth.user.username},{t('what are you thinking?')}
        </button>
      </div>
    );
}

export default Status
