import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { useSelector } from 'react-redux'
import { Card, Image, Text, Group,Grid } from '@mantine/core';

import { BarChart,ResponsiveContainer,Bar, XAxis, YAxis, Tooltip, Line, LineChart, CartesianGrid} from 'recharts';
function Statitics() {
    const { auth } = useSelector(state => state)
    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [numberOfAll, setNumberOfAll] = useState([]);
    useEffect(() => {
  
        const get = async()=>{
            try{
                const { data: response } = await axios.get(`/api/user/getMonthlyUser`, {
                    headers: { Authorization: auth.accesstoken }
               });
                const { data: response1 } = await axios.get(`/api/getMonthlyPost`, {
                    headers: { Authorization: auth.accesstoken }
               });
                const { data: response2 } = await axios.get(`/api/get-number-all`, {
                    headers: { Authorization: auth.accesstoken }
               });
             /*   console.log(response.monthlyPostRegistrations) */
               setUserData(response.monthlyRegistrations)
               setPostData(response1.monthlyPostRegistrations)
               console.log(response2)
               setNumberOfAll(response2)
            }
            catch(err){
                console.log(err)
            }

   
        }
        get()
        
   }, [])

  return (
    <div className='flex'>

        <div className='lg:w-[50vw] md:w-[60vw] w-[70vw] h-[50vh]'>
            
        <div className='font-bold text-3xl mb-4'>User statistics</div>
   
        <ResponsiveContainer >
            <BarChart data={userData} width={400} height={300} >
                <XAxis dataKey="monthName" />
                <YAxis  />
                <Tooltip />
                <Bar dataKey="count" barSize={40} fill="#8884d8"/>
            </BarChart>
        </ResponsiveContainer>
        
        
        <div className='font-bold text-3xl my-4'>Post statistics</div>
        <ResponsiveContainer >
            <LineChart data={userData} width={400} height={300} >
                <XAxis dataKey="monthName" />
                <YAxis  />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Line dataKey="count"   type="monotone" fill='' />
            </LineChart>
        </ResponsiveContainer>

     
      
      
          
        </div>
          <div className='flex mx-8 justify-center items-center flex-col  w-[40%] '>
      
           <div className='h-[440px] my-4 flex justify-center items-center '>

            <Card
        shadow="sm"
        padding="md"
        component="a"
    
      /*   target="_blank" */
      /*   className='h-[50%]' */
        >
        <Card.Section>
            <Image
            src="https://st2.depositphotos.com/4520249/7106/v/450/depositphotos_71066225-stock-illustration-people.jpg"
            height={270}
            width={310}
            alt="No way!"
            />
        </Card.Section>

        <p  className='text-center my-3 text-lg font-semibold select-none '>
        Number of users in system: {numberOfAll?.lengthUsers}


        </p>

        
        </Card>
           </div>
           <div className='h-[440px]  my-4 flex justify-center items-center '>

            <Card
        shadow="sm"
        padding="md"
        component="a"
   
        >
        <Card.Section>
            <Image
            src="https://www.shutterstock.com/image-vector/istanbul-turkeyapril-4-2023-instagram-260nw-2284613577.jpg"
            height={270}
            width={310}
            alt="No way!"
            />
        </Card.Section>

        <p  className='text-center my-3 text-lg font-semibold select-none '>
        Number of posts in system: {numberOfAll?.lengthPosts}
        </p>

        
        </Card>
           </div>
    </div>
    </div>
  )
}

export default Statitics