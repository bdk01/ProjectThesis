
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
import { useCreateGroup, useEditGroup, useUpdateGroup } from '../../hooks/forum-hook'
import { useSelector } from 'react-redux'


export default function CreateGroupModal({ closeModal, type, form }) {
  const { mutateAsync: createGroup } =
    useCreateGroup()
  const { mutateAsync: updateGroup } =
    useEditGroup()
  const { auth } = useSelector(state => state)
  /* const [avatar, setAvatar] = useState('') */
  const [opened, setOpened] = useState(false)
  const schema = z.object({
    forumName: z.string(),
      description: z.string(),
      isPrivate: z.boolean(),
   
 
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    control
  } =  
  useForm({
    defaultValues: { 
      forumName: "",
      description: "",
      isPrivate: false
    }
  })

  useEffect(() => {
    if (type === 'edit') {
      console.log(form)
     
      Object.entries(form).forEach(([key, value]) => {
        setValue(key, value)
      })
      setValue("isPrivate",form.isPrivate)
    }
  }, [])



  return (
    <form
      className='w-[100%] py-7 '
      onSubmit={handleSubmit(
        (data) => {


          switch (type) {
            case 'add':
              console.log(data)
                createGroup({ forumName: data.forumName, description: data.description,creator:auth.user._id,isPrivate:data.isPrivate })
              break
            case 'edit':
              console.log({ ...data })
              updateGroup({ forumName: data.forumName, description: data.description,isPrivate:data.isPrivate,id:form._id  })
              break
          }
          closeModal()

        },
        (error) => console.log(error)
      )}
    >
      <Flex className='mx-6 mb-2 items-center justify-center'>

      </Flex>

      <Flex className='mt-3 flex-col items-start'>
        <Flex className='   mx-2 mb-3 w-[100%]  '>
          <Text className='min-w-[100px]' fw={500}>
            ForumName
          </Text>

          <Flex className='w-[100%] flex-col justify-start'>
          
            <TextInput
              name='forumName'
              radius='md'
              size='md'
              control={control}
              placeholder='forumName'
              className='mr-2 w-[80%] text-black'
            />
          </Flex>
        </Flex>
        <Flex className=' mx-2 w-[100%] mb-2'>
          <Text className='min-w-[100px]' fw={500}>
            Description   
          </Text>
          <Flex className='w-[100%] flex-col '>

            <TextInput
              name='description'
              radius='md'
              size='md'
              control={control}
              placeholder='forumName'
              className='mr-2 w-[80%] text-black'
            />
          </Flex>
        </Flex>
        <Flex className=' mx-2 w-[100%]'>
          <Text className='min-w-[100px]' fw={500}>
            IsPrivate
          </Text>
          <Flex className='w-[100%] flex-col'>
             <Select
              /* defaultChecked={data.isPrivate} */
              className='mr-2 w-[80%] text-black'
              name="isPrivate"
              control={control}
              data={[
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ]}    
           /*    defaultValue={isPrivate}     */ 
            />

          </Flex>
        </Flex>
      </Flex>

      <Group position='center' mt='md'>

        <Button
          type='submit'
          color='blue'
          variant='filled'
          className='bg-blue-400'

        >
          Submit
        </Button>
      </Group>
    </form>
  )
}
