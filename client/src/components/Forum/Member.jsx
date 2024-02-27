
import {

  Button,
  Flex,

  Group,


  Text

} from '@mantine/core'
import {
  Select,
  TextInput
} from 'react-hook-form-mantine'
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { IoAdd } from 'react-icons/io5'
import { z } from 'zod'

import { Image } from 'antd'
import { useCreateGroup, useUpdateGroup } from '../../hooks/forum-hook'
import { useSelector } from 'react-redux'

import UserCardForumMember from './UserCardForumMember'



export default function Member({ form }) {
  const { mutateAsync: createGroup } =
    useCreateGroup()
  const { mutateAsync: updateGroup } =
    useUpdateGroup()
  const { auth } = useSelector(state => state)
  return (
   
      <Flex className='mx-6 mb-2 items-center justify-center flex-col'>
           {
                    form?.map(user => (
                        <UserCardForumMember key={user?._id} user={user} >

                        </UserCardForumMember>
                    ))
                }
      </Flex> 
  )
}
