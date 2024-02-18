import React, { useState, useEffect } from 'react'
/* import Avatar from '../../Avatar' */
import { Link } from 'react-router-dom'
import moment from 'moment'

import LikeButton from '../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from './CommentMenu'
/* import { updateComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction' */
import InputComment from '../InputComment'
import { likeComment, unLikeComment, updateComment } from '../../../api/postAPI'
import { useTranslation } from 'react-i18next'

const CommentCard = ({children, comment, post, commentId}) => {
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)

    const [onEdit, setOnEdit] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [onReply, setOnReply] = useState(false)


    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }
    },[comment, auth.user._id,dispatch])

    const handleUpdate = async() => {
        if(comment.content !== content){
         /*    dispatch(updateComment({comment, post, content, auth})) */
           await updateComment({comment, post, content, auth,dispatch})
            setOnEdit(false)
        }else{
            setOnEdit(false)
        }
    }


    const handleLike = async () => {
        if(loadLike) return;
        setIsLike(true)

        setLoadLike(true)
        /* await dispatch(likeComment({comment, post, auth})) */
       await likeComment(comment, post, auth,dispatch)
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;
        setIsLike(false)

        setLoadLike(true)
       await unLikeComment(comment, post, auth,dispatch)
        setLoadLike(false)
    }


    const handleReply = () => {
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentId})
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }
    const handleCancel =()=> {
       /*  setContent(content) */
       setOnEdit(false)
    }

    return (
        <div className="comment_card mt-2 mx-2" style={styleCard}>
            <div className="flex text-dark items-center">

            <img src={comment.user.avatar} className="bg-gray-200 border border-white rounded-full w-9 h-9" />
            <div className='ml-2 px-[12px] py-[3px] rounded-2xl bg-slate-200 flex justify-start flex-col'>

             <Link to={`/profile/${comment.user._id}`} className='pb-[2px]'>
                <h6 className=" text-start text-black font-semibold text-base">{comment.user.username}</h6>
             </Link>
                    {
                        onEdit 
                        ? <textarea  className='border-none ring-0 min-w-[300px]' value={content}
                        onChange={e => setContent(e.target.value)} />

                        : <div>
                            {
                                comment.tag && comment.tag._id !== comment.user._id &&
                                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                                    @{comment.tag.username}
                                </Link>
                            }
                            <span>
                                {
                                    content.length < 100 ? content :
                                    readMore ? content + ' ' : content.slice(0, 100) + '....'
                                }
                            </span>
                            {
                                content.length > 100 &&
                                <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                    {readMore ? t('hide') : t('readmore')}
                                </span>
                            }
                        </div>
                    }
            </div>
                    <div className="d-flex align-items-center mx-2" style={{cursor: 'pointer'}}>
                    <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>
            </div>

            <div className=" flex ">
                <div className="flex flex-col " 
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>
                
                    

                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="font-weight-bold mr-3">
                            {comment.likes.length}   { t('likes')}
                        </small>

                        {
                            onEdit
                            ? <>
                                <small className="font-weight-bold mr-3"
                                onClick={handleUpdate}>
                                    { t('update')}
                                </small>
                                <small className="font-weight-bold mr-3" /* value={content} */
                                onClick={handleCancel}>
                                       { t('cancel')}
                                </small>
                            </>

                            : <small className="font-weight-bold mr-3"
                            onClick={handleReply}>
                                {onReply ? t('cancel') :    t('reply')}
                            </small>
                        }
                        
                    </div>
                    
                </div>

                   
             
            </div> 
            
            {
                onReply &&
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                    <Link to={`/profile/${onReply.user._id}`} className="mr-1">
                        @{onReply.user.username}:
                    </Link>
                </InputComment>
            }

            {children}
        </div>
    )
}

export default CommentCard
