import React, { Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'
import UserCard from '../../components/profile/UserCard'
import { useDisclosure } from '@mantine/hooks'
import WaitingUsers from '../../components/Forum/WaitingUsers'
import { Button, Flex, Modal } from '@mantine/core'
import Member from '../../components/Forum/Member'


const RightSideForum = ({ forumData }) => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [isOpenedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
    const [isOpenedMemberModal, { open: openMemberModal, close: closeMemberModal }] = useDisclosure(false)
    return (
        <div className="mt-3">
            {
                forumData?.creator === auth.user._id &&
                <Flex className='items-center justify-center'>
                    <Button
                    variant='filled'
                    className=' mb-1 bg-blue-400 mr-2'
                
                    onClick={() => openEditModal()}
                >
                    List of waitingUsers
                </Button>
                    <Button
                    variant='filled'
                    className=' mb-1 bg-blue-400'
                
                    onClick={() => openMemberModal()}
                >
                    List of Member
                </Button>
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
   
            <div>Attendees</div>


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
