import React from 'react'
import { useSelector } from 'react-redux'

const LikeButton = ({isLike, handleLike, handleUnLike}) => {


    return (
        <>
            {
                isLike
                ? <i className="fas fa-heart text-danger text-2xl" onClick={handleUnLike}
              />
                : <i className="far fa-heart text-2xl" onClick={handleLike} />
            }
        </>
    )
}

export default LikeButton
