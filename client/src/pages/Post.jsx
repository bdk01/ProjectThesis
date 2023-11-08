import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../assets/img/loading.gif'
import PostCard from '../components/home/PostCard'
import { getDPost, getPostDetail} from '../api/postAPI'
import axios from '../axios'
import { getDetailPost } from '../redux/detailPostSlice'



const Post = () => {
     const { id } = useParams()
     const [post, setPost] = useState([])

     const { auth, detailPost,homePosts } = useSelector(state => state)
     const dispatch = useDispatch()

     useEffect( () => {
          const getPost1 = async()=>{
               const  res = await  getPostDetail(auth,dispatch,id)
               console.log(res)
               setPost(res.post)
          }
   
   
         console.log(auth.accesstoken)
               getPost1()
       
    
     }, [id, auth, dispatch, homePosts.posts])
   
        /*   useEffect(() => {
         
         
               getDPost({detailPost, id, auth})
       
               if(detailPost.length > 0){
                    const newArr = detailPost.filter(post => post._id === id)
                   setPost(newArr)
               }
           },[detailPost, dispatch, id, auth,]) */





    /*  useEffect(() => {
          dispatch(getPost({detailPost, id, auth}))
  
          if(detailPost.length > 0){
              const newArr = detailPost.filter(post => post._id === id)
              setPost(newArr)
          }
      },[detailPost, dispatch, id, auth,]) */
  


    /*  useEffect(() => {
          if (auth.accesstoken) {
          
             const gg = async()=>{
                 await  getDPost( {detailPost, id, auth,dispatch})           
                 if (detailPost.posts.length > 0) {
                 
                      const newArr = detailPost.posts.filter(postm => postm._id === id)
                      console.log(newArr)
                      setPost(newArr[0])
                      console.log('m')
                 }
             }
             gg()
          }
     }, [detailPost, dispatch, id, auth])
 */
     return (
          <div className="sm:mx-10 md:mx-32">
               {
                    post?.length === 0 &&
                    <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
               }

               {
                    post?.length !== 0 &&
                         <PostCard key={post?._id} post={post} />
                  
               }
          </div>
     )
}

export default Post