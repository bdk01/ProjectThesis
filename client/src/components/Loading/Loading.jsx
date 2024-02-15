import { LoadingOverlay } from '@mantine/core'
import React from 'react'

function Loading() {
  return (
    <div className='h-[90vh] w-[80%] flex justify-center items-center'>
            <LoadingOverlay
            loaderProps={{ size: 'xl', color: 'pink', variant: 'bars' }}
            overlayOpacity={0.3}
            overlayColor="#c5c5c5"
            visible
            transitionDuration={500}
            />

    </div>
  )
}

export default Loading