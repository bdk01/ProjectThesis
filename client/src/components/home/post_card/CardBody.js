import React, { useState } from 'react'
import Carousel from '../Carousel'

const CardBody = ({post}) => {
    const [readMore, setReadMore] = useState(false)
    
    
    return (
        <div className="card_body">
            <div className="mx-2" 
           >
                <span className='mr-3 ml-2'>
                    {
                        post.content.length < 65 
                        ? post.content 
                        : readMore ? post.content + ' ' : post.content.slice(0, 65) + '.....'
                    }
                </span>
                {
                    post.content.length > 65 &&
                    <span className="readMore cursor-pointer " onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Hide content' : 'Read more'}
                    </span>
                }

            </div>
            {
                post.images.length > 0 && <Carousel images={post.images} id={post._id} />
            }
            
        </div>
    )
}

export default CardBody
