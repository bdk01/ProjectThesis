import React, { useEffect, useState } from 'react'

import Info from '../components/profile/Info'
import Posts from '../components/profile/Posts'
import Saved from '../components/profile/Saved'

import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../assets/img/loading.gif'
/* import { getProfileUsers } from '../../redux/actions/profileAction' */
import { useParams } from 'react-router-dom'
import { getProfileUsers } from '../api/profileAPI'
import { useTranslation } from 'react-i18next'


const Profile = () => {
     const { profile, auth } = useSelector(state => state)
     const dispatch = useDispatch()
   
     const { id } = useParams()
    /*  const [saveTab, setSaveTab] = useState(false) */

     useEffect(() => {
          if (profile.ids.every(item => item !== id) && auth.accesstoken) {
       
               getProfileUsers( id, auth,dispatch )
               
          }
     }, [id, auth.accesstoken, dispatch, profile.ids])

     return (
          <div className="w-[100%] min-h-[100vh]">

               <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

               {
                    auth.user._id === id &&
                    <div className="w-[100%] flex justify-center border-t-[1px] border-b-[1px]">
                              <button className={ 'outline-none border-none bg-white uppercase font-extrabold text-lg px-[20px] py-[5px] opacity-[0.5] my-[25px] '}>Posts</button>
                         
                    </div>
               }

               {
                    profile.loading
                         ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                         : <>
                           
                            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                          
                         </>
               }

          </div>
     )
}

export default Profile
