import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';

import classes from './card.module.css';
import { Link, useNavigate } from 'react-router-dom';


export function CardInform({user}) {
 


  const navigate = useNavigate();
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
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
       FullName: {user?.fullname}
        </Text>
      </Card.Section>

      <Card.Section className='ml-1 '>
     {/*    <Text mt="md" className={classes.label} c="dimmed"> */}
          {
             user.phone? 
             <div>
              <Text mt="md" className='text-[18px] font-medium'  c="dimmed">
              SDT:{user.phone}
                </Text>  
             </div> 
             :<></>

          }
      {/*   </Text> */}
        <Group gap={7} mt={5}>
        
        </Group>
      </Card.Section>

      <Group mt="xs">
        <button className='bg-blue-400 px-2 py-2 rounded-md' radius="md" style={{ flex: 1 }} variant='filled'   >
    
          <Link className='no-underline font-thin' to={`/profile/${user._id}`}>Go to details</Link>
        </button>
      
      </Group>
    </Card>
  );
}