import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { deletePost } from '../../../api/postAPI'
import { OpenStatusEdit } from '../../../redux/statusSlice'
import { useTranslation } from 'react-i18next'

/* import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config' */

const CardHeader = ({post}) => {
    const { auth, socket } = useSelector(state => state)
     const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
 const handleClick = e =>{
       e.preventDefault()
       setOpen(!open)
    }
    const navigate = useNavigate()
    const { t } = useTranslation();
    const handleEditPost = () => {
     /*    dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}}) */
          dispatch(OpenStatusEdit({ post:post,status: true,onEdit:true }))
    }

    const handleDeletePost = () => {
        if(window.confirm("Are you sure want to delete this post?")){
            deletePost(post, auth, socket,dispatch)
          /*   dispatch(deletePost({post, auth, socket})) */
         
            return navigate("/home", { replace: true });
        }
    }

    const handleCopyLink = () => {
       
        navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`)
    }

    return (
        <div className="card_header">
           
        
             <div className="flex justify-between items-center px-4 py-3 flex-row ">
                                <div className="flex flex-1 items-center space-x-4">
                                   
                                        <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">  
                                            <img src={post.user.avatar} className="bg-gray-200 border border-white rounded-full w-10 h-10" />
                                        </div>
                                    <div>
                                    <span className="block capitalize font-semibold "> {post.user.username} </span>
                                    <small className="text-muted">
                                        {moment(post.createdAt).fromNow()}
                                    </small>

                                    </div>
                                </div>
                   <div className="nav-item dropdown cursor-pointer">
                <span className="material-icons " id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu cursor-pointer">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span>  { t('editpost')}
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost} >
                                <span className="material-icons">delete_outline</span>   { t('deletepost')}
                            </div>
                        </>
                    }

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span>  { t('copy')}
                    </div>
                </div>
            </div>
        
                      
            </div>

         
        </div>
    )
}

export default CardHeader
