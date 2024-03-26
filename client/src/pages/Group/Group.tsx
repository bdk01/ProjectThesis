import { Grid, Menu, Modal, Paper, Tooltip } from '@mantine/core'
import { Image } from 'antd'

import CardGroup from './CardGroup'
import { BsThreeDots } from 'react-icons/bs'

import { useDisclosure } from '@mantine/hooks'
import CreateGroupModal from './CreateGroupModal'

import { useEffect } from 'react'
import { useGetGroup } from '../../hooks/forum-hook'

function GroupComponent() {
  const [opened, { open, close }] = useDisclosure(false)
  const { data, isError, isFetching, isLoading, refetch } = useGetGroup()
  const [isOpenedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false)

  const [isOpenedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false)
  console.log(data)
  
  if (isFetching) {
    return <>Loading</>
  }
  return (
    <>
      <Modal
        opened={isOpenedAddModal}
        onClose={closeAddModal}
        centered
        size='55%'
        title='Add links'
      >
        <CreateGroupModal type={'add'} closeModal={() => closeAddModal()} />
      </Modal>
      <Paper className='z-2  mt-1 flex items-center  justify-center rounded-xl px-5 py-5  shadow-2xl'>
        <div className='flex w-[100%] items-center justify-between'>
          <div className='flex items-center'></div>
          <div className='flex justify-between '></div>
        </div>
        <div className=' z-[20] h-[44px] w-[180px] '>
          <div className='!frame'>
            <button
              onClick={() => openAddModal()}
              className='btn-9 custom-btn flex flex-row items-center'
            >
              <Image
                preview={false}
                src='/icon/create-folder.svg'
                className='mr-2 font-extrabold text-white '
                width={28}
                height={28}
                alt='#'
              />
              <div className='text-center text-[14px] font-bold '>

                Create Group
              </div>
            </button>
          </div>
        </div>
      </Paper>

      <Paper withBorder shadow='md' mt={15} radius='md' className=''>
        <Grid columns={6} gutter='xl' className='mx-3 my-2'>
          {
            data.map((group: any) => (
              <Grid.Col span={2} key={group.id} >
                <CardGroup group={group} />
              </Grid.Col>
            ))
          }

        </Grid>
      </Paper>
    </>
  )
}

export default GroupComponent
