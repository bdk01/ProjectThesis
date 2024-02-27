
import { Button, Card, Flex, Grid, Group, Modal, Text } from '@mantine/core'
import { Image } from 'antd'
import React from 'react'
import CreateGroupModal from '../../components/Forum/CreateGroupModal'
import { useDisclosure } from '@mantine/hooks'
import { useDeleteGroups, useEditGroup } from '../../hooks/forum-hook'
import folder from "../../assets/folder/folder-1.svg"
import folder2 from "../../assets/folder/folder-2.svg"
import { useNavigate } from 'react-router-dom'
import { TbLockBolt } from "react-icons/tb";
import { useSelector } from 'react-redux'
import { IoTrashBinOutline } from "react-icons/io5";
import { MdEdit } from 'react-icons/md'
function CardGroup({ group,type }) {
  const { auth } = useSelector(state => state)
  const [isOpenedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false)
  const { mutateAsync: deleteGroup } =
    useDeleteGroups()
  const { mutateAsync: editGroup } =useEditGroup()
    const navigate = useNavigate()
    const handleNavigate = (id)=>{
      navigate(`/forum/${id}`, { replace: true });
 }
  return (
    <>
      <Modal
        opened={isOpenedEditModal}
        onClose={closeEditModal}
        centered
        size='55%'
        title='Edit Group'
      >
        <CreateGroupModal form={group} type={'edit'} closeModal={() => closeEditModal()} />
      </Modal>

      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Card.Section>
          <Flex className='mx-2 mt-2 justify-between'>
            <Group className='ml-6'>
              {
                group?.isPrivate ?<Image
                preview={false}
                src={folder2}
                width={45}
                height={45}
                alt='Norway'
              />
              :
              <Image
                preview={false}
                src={folder}
                width={45}
                height={45}
                alt='Norway'
              />
              }
              
            </Group>

            <Flex className='  justify-end'>
              {
                group?.isPrivate &&(
                  <TbLockBolt  width={23}
                  height={23} className='w-10 h-10' />
                )
              }
    
             {
               type==="myforum"&&
               <>
               <IoTrashBinOutline className='w-10 h-10 '  onClick={() => deleteGroup({ id: group._id,auth  })}/>
              <MdEdit className='w-10 h-10 '   onClick={() => openEditModal()} /*  onClick={() => editGroup({ id: group._id,auth  })} *//>
              
              </>
             }
            
            </Flex>
          </Flex>
        </Card.Section>

        <Group mt='sm' mb='xs'>
          <Text fw={500} size={24}>
            {group?.forumName}
          </Text>
        </Group>
        <Flex className=' mt-2 justify-between'>
          <Text size='sm' c='dimmed'>
            {group?.attendees?.length } member
          </Text>
          <Button
                  variant='outline'
                  className=' mb-1'
                  onClick={() => handleNavigate(group._id)}
                >
                 Go to group
            </Button>
        </Flex>
      </Card>
    </>
  )
}

export default CardGroup
