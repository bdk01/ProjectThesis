import { Button, Flex, Grid, Loader, Menu, Modal, Pagination, Paper, Tooltip } from '@mantine/core'
import { Image } from 'antd'

import CardGroup from './CardGroup'

import { useDisclosure } from '@mantine/hooks'
import CreateGroupModal from '../../components/Forum/CreateGroupModal'

import { useEffect, useState } from 'react'
import { useGetGroup } from '../../hooks/forum-hook'
import { useSelector } from 'react-redux'

function GroupComponent({type}) {
  const {  auth } = useSelector(state => state)
  const [activePage, setPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false)
  const [typefetch,setTypefetch]=useState("")
  const { data, isError, isFetching, isLoading, refetch } = useGetGroup({type:typefetch,auth,page:activePage})
  const [isOpenedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false)

 useEffect(()=>{
  setTypefetch(type)
 },[])
  console.log(data)
/*   if (isFetching) {
    return <>Loading</>
  } */
  return (
    <div>
      <Modal
        opened={isOpenedAddModal}
        onClose={closeAddModal}
        centered
        size='55%'
        title='Add new forum'
      >
        <CreateGroupModal type={'add'} closeModal={() => closeAddModal()} />
      </Modal>
      <div  className='border-gray-300 border-[1px] border-solid flex my-2 py-2  items-center relative'>
        <div className='flex w-[100%] items-center justify-between'>
          <div className='flex items-center'></div>
          <div className='flex justify-between '></div>
        </div>
        <div className='flex w-[100%] items-center justify-between'>
        
          <div className=' z-[20] h-[44px] w-[180px] flex start '>
            
      {
        auth?.user.role!=="user" &&

              <Button
                    variant='outline'
                    size='md'
                    className=' mb-1'
                    onClick={() => openAddModal()}
                  >
                    Create Forum
                  </Button>
      }

          
          </div>
        </div>
      </div>

      <div  className='border-gray-300 border-[1px] border-solid'>
        <Grid columns={6} gutter='xl' className='mx-3 my-2'>
          { 
            isFetching ?         <Flex className='justify-center items-center'>

            <Loader color="grape" size={48} />
          </Flex>
            : 
            
              data?.forum?.map((group) => (
                <Grid.Col span={2} key={group._id} >
                  <CardGroup group={group} type={type} />
                </Grid.Col>
              ))

          }
        </Grid>
        {
          !isFetching  &&
          <Flex className='justify-center items-center my-2'>

              <Pagination value={activePage} /* siblings={1} */ onChange={setPage} total={Math.ceil(data?.result/6)} styles={(theme) => ({
                  control: {
                    '&[data-active]': {
                      backgroundImage: theme.fn.gradient({ from: 'blue', to: 'purple' }),
                      border: 10,
                    },
                  },
                })} />
          </Flex>
        }
      </div>
    </div>
  )
}

export default GroupComponent
