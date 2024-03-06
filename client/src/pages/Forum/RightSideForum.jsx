import React, { Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'
import UserCard from '../../components/profile/UserCard'
import { useDisclosure } from '@mantine/hooks'
import WaitingUsers from '../../components/Forum/WaitingUsers'
import { Button, Flex, Modal } from '@mantine/core'
import Member from '../../components/Forum/Member'
import { useJoinPublicForumDetail, useKickForumDetail, useRequestJoinForumDetail } from '../../hooks/detail-forum-hook'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'
import { MdGroup } from 'react-icons/md'


const RightSideForum = ({ forumData,setIsJoining,isJoining }) => {
    const { auth, suggestions } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { t } = useTranslation();
    const { mutateAsync: OutJoin ,isLoading:loadingRequest,isSuccess } =useKickForumDetail()
    const { mutateAsync: JoinPublicForum  } =useJoinPublicForumDetail()
    const Joinhandle = async()=>{
      console.log({userId:auth.user._id,auth,id})
      
       await JoinPublicForum({userId:auth.user._id,auth,id})
       setIsJoining(true)
     }
    const Leavehandle = async()=>{
   
       await OutJoin({userId:auth.user._id,auth,id})

       setIsJoining(false)
       return navigate("/forum", { replace: true });
     }
    const [isOpenedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
    const [isOpenedMemberModal, { open: openMemberModal, close: closeMemberModal }] = useDisclosure(false)
    return (
        <div className="mt-3">
            {
                forumData?.creator === auth.user._id ?
                <Flex className='items-center justify-center'>
                    <Button
                    variant='filled'
                    className=' mb-1 bg-blue-400 mr-2'
                
                    onClick={() => openEditModal()}
                >
                 <BsPerson size={20} className='mr-1'  />      {t('List of waitingUsers')}
                </Button>
                    <Button
                    variant='filled'
                    className=' mb-1 bg-blue-400'
                
                    onClick={() => openMemberModal()}
                >
                 <MdGroup size={20} className='mr-1'  />     {t('List of Member')}
                </Button>
                </Flex> 
                : <Flex className='justify-center'>
                {
                    isJoining ?
                    <Button
                    variant='filled'
                    size='md'
                    className=' mb-1 bg-red-400 mr-2'
                    
                    onClick={Leavehandle}
                >
                  <BsPerson size={20} className='mr-1'  />    {t('Leave')}
                </Button>
                :
                <Button
                variant='filled'
                className=' mb-1 bg-blue-400 mr-2'
                size='md'
                onClick={Joinhandle}
            >
               <BsPerson size={20} className='mr-1'  />    {t('Join')}
            </Button>
                }
                </Flex>
            }
            <Modal
                opened={isOpenedEditModal}
                onClose={closeEditModal}
                centered
                size='55%'
                title='Waiting users'
            >
                <WaitingUsers form={forumData?.waitingUsers} closeModal={() => closeEditModal()} />
            </Modal>
            <Modal
                opened={isOpenedMemberModal}
                onClose={closeMemberModal}
                centered
                size='55%'
                title='Manage member'
            >
                <Member form={forumData?.attendees} closeModal={() => closeMemberModal()} />
            </Modal>
   
            <div>   {t('Attendees')}</div>


            <div className="suggestions">
                {
                    forumData?.attendees?.map(user => (
                        <UserCard key={user?._id} user={user} >

                        </UserCard>
                    ))
                }
            </div>

        </div>
    )
}

export default RightSideForum
