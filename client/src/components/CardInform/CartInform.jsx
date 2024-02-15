
import { Card, Image, Text, Group } from '@mantine/core';

import {  useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export function CardInform({user}) {




  const navigate = useNavigate();
  const { t } = useTranslation();
  const gotopage = () =>{
  return  navigate(`/profile/${user._id}`)
  }
  return (
    <Card withBorder radius="md" p="md" className='min-h-[400px]'>
      <Card.Section>
        <Image src={user?.avatar} alt="#" height={200} />
      </Card.Section>

      <Card.Section className='ml-1' mt="md" >
        <Group justify="apart">
          <Text fz="lg" fw={500} className=''>
         Email: {user?.email}
          </Text>
        
        </Group>
        <Text className='text-[18px] font-medium' >
        {t('fullname')}: {user?.fullname}
        </Text>
      </Card.Section>

      <Card.Section className='ml-1  '>
     {/*    <Text mt="md" className={classes.label} c="dimmed"> */}
          {
             user.profile.phone? 
             <div>
              <Text mt="sm" className='text-[18px] font-medium'  c="dimmed">
              SDT:{user?.profile?.phone}
                </Text>  
             </div> 
             :<> <div>
             <Text mt="sm" className='text-[18px] font-medium'  c="dimmed">
             SDT:Empty
               </Text>  
            </div>  </>

          }
      {/*   </Text> */}
        <Group gap={7} mt={5}>
        
        </Group>
      </Card.Section>

      <Group mt="xs">
        <button className='bg-blue-400 px-2 py-2 rounded-md' radius="md" style={{ flex: 1 }} variant='filled'   >
  
          <Text className='no-underline font-semibold text-lg' onClick={gotopage} >{t('Gotoprofile')}</Text>
        </button>
      
      </Group>
    </Card>
  );
}