import { useQuery } from "@tanstack/react-query"
import axios from '../axios'
import { useSelector } from "react-redux"

const fetchUserId=async(userId,accesstoken) =>{
    const gg=  await  axios.get(`/api/taSchedule/${userId}`, {
        headers: { Authorization: accesstoken }
   })
   console.log(gg)
}

export const useGetUserData = (userId,accesstoken) =>{
    return useQuery(['userTeacher',userId],()=>fetchUserId(userId,accesstoken))
}