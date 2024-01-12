import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../assets/img/send.svg'
import LikeButton from '../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, savePost, unLikePost, unSavePost } from '../../../api/postAPI'
import { useTranslation } from 'react-i18next'

/* import ShareModal from '../../ShareModal' */
/* import { BASE_URL } from '../../../utils/config' */


const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const { auth, socket,homePosts } = useSelector(state => state)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // Likes
    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [post.likes, auth.user._id,dispatch,homePosts.posts])

    const handleLike = async () => {
        if(loadLike) return;
     
        setLoadLike(true)
        await likePost(post, auth,dispatch, socket)
      /*   await dispatch(likePost({post, auth, socket})) */
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;
           
        setLoadLike(true)
                await unLikePost(post, auth,dispatch, socket)
     /*    await dispatch(unLikePost({post, auth, socket})) */
        setLoadLike(false)
    }


    // Saved
   /*  useEffect(() => {
        if(auth.user.saved.find(id => id === post._id)){
            setSaved(true)
        }else{
            setSaved(false)
        }
    },[auth.user.saved, post._id]) */

    const handleSavePost = async () => {
        if(saveLoad) return;
        
        setSaveLoad(true)
        await dispatch(savePost({post, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if(saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSavePost({post, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer mx-2">
            <div className="card_icon_menu flex justify-between ">
                <div className='flex items-center justify-around'>
                    <LikeButton 
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                 
                    />

                    <Link to={`/post/${post._id}`} className="text-dark ml-4">
                        <i className="far fa-comment text-2xl"  />
                    </Link>

                {/*     <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} /> */}
                </div>

           {/*      {
                    saved 
                    ?  <i className="fas fa-bookmark text-info text-2xl"
                    onClick={handleUnSavePost} />

                    :  <i className="far fa-bookmark text-2xl"
                    onClick={handleSavePost} />
                } */}
               
            </div>

            <div className="flex justify-between ">
                <h2  className='px-0 py-[15px] font-bold'  >
                    {post?.likes?.length} { t('likes')}
                </h2>
                
                <h2 className='px-0 py-[15px] font-bold'  >
                    {post?.comments?.length} { t('comments')}
                </h2>
            </div>

         {/*    {
                isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
            } */}
        </div>
    )
}

export default CardFooter
