import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function NewPage() {
    const {auth} = useSelector(state=>state)
    const navigate = useNavigate();
    useEffect(()=>{
        if(auth.accesstoken){
            navigate(`/home}`, { replace: true })
        }
      /*   else{
            navigate("/login")
        } */
    },[])
  return (
    <div>NewPage</div>
  )
}
