
import {
  Flex,
} from '@mantine/core'

import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'


import UserCardForumInvite from './UserCardForumInvite'



export default function Invite({ form,forum }) {
  
  const { auth } = useSelector(state => state)
  /* useGetOutsideUser */
  console.log(forum)
  return (
   
      <Flex className='mx-6 mb-2 items-center justify-center flex-col'>
           {
                    form?.map(user => (
                        <UserCardForumInvite key={user?._id} user={user} forum={forum} >

                        </UserCardForumInvite>
                    ))
                }
      </Flex> 
  )
}
