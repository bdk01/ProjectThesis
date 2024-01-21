import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { useSelector } from 'react-redux'


import { BarChart,ResponsiveContainer,Bar, XAxis, YAxis, Tooltip, Line, LineChart, CartesianGrid} from 'recharts';
function Statitics() {
    const { auth } = useSelector(state => state)
    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);
    useEffect(() => {
  
        const get = async()=>{
            try{
                const { data: response } = await axios.get(`/api/user/getMonthlyUser`, {
                    headers: { Authorization: auth.accesstoken }
               });
                const { data: response1 } = await axios.get(`/api/getMonthlyPost`, {
                    headers: { Authorization: auth.accesstoken }
               });
             /*   console.log(response.monthlyPostRegistrations) */
               setUserData(response.monthlyRegistrations)
               setPostData(response1.monthlyPostRegistrations)
            }
            catch(err){
                console.log(err)
            }

   
        }
        get()
        
   }, [])

  return (
    <div className='w-[60vw] h-[50vh]'>
       <div className='font-bold text-3xl mb-4'>User statistics</div>
       <ResponsiveContainer >
        <BarChart data={userData} width={400} height={300} >
            <XAxis dataKey="monthName" />
            <YAxis  />
            <Tooltip />
            <Bar dataKey="count" fill='#CDB4DB' />
        </BarChart>
       </ResponsiveContainer>
       <div className='font-bold text-3xl my-4'>Post statistics</div>
       <ResponsiveContainer >
        <LineChart data={userData} width={400} height={300} >
            <XAxis dataKey="monthName" />
            <YAxis  />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
            <Line dataKey="count" fill='' />
        </LineChart>
       </ResponsiveContainer>

    </div>
  )
}

export default Statitics