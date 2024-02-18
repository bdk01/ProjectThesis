import React from 'react'



import Comments from './Comments'
import InputComment from './InputComment'
import CardHeader from './post_card/CardHeader'
import CardBody from './post_card/CardBody'
import CardFooter from './post_card/CardFooter'

const PostCard = ({post, theme}) => {
    return (
        <div className="card my-3 "> 
            <CardHeader post={post} />
            <CardBody post={post}  />
            <CardFooter post={post} />

            <Comments post={post} />
            <InputComment post={post} />
        </div>
    )
}

export default PostCard
