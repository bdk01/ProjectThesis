import { MdAllInbox } from "react-icons/md";
import GroupComponent from "./Group";
import { Tabs, Text } from "@mantine/core";
import { IoCreate } from "react-icons/io5";
import { useTranslation } from "react-i18next";




export default function ForumPage() {
  const { t } = useTranslation();
  return (
    <div>
   
    <Tabs
        className='mt-3 max-w-[100%]'
        variant='pills'
        color='dark'
        radius='sm'
        defaultValue='myGroup'
        keepMounted={false}
      >
        <Tabs.List
          className=' absolute z-20 ml-[30px]  '
          color='grape'
        >
          <Tabs.Tab
            value='myGroup'
            className=' z-2 mt-[2px] py-2 shadow-2xl '
            icon={<IoCreate className='h-[24px] w-[24px]' />}
          >
            <Text className='font-semibold' size={19}>
                {t('All Forum')}
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='shareGroup'
            className=' z-2 mt-[2px] py-2 shadow-2xl '
            icon={<IoCreate className='h-[24px] w-[24px]' />}
          >
            <Text className='font-semibold' size={19}>
                 {t('My Forum')}
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='myGroup'>
        <GroupComponent type={'all'} />
        </Tabs.Panel>
        <Tabs.Panel value='shareGroup' >
        <GroupComponent  type={'myforum'}  />
        </Tabs.Panel>
      </Tabs>
      
    </div>
  )
}
