import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../assets/img/loading.gif'
import PostCard from '../components/home/PostCard'
import { getPost } from '../api/postAPI'
import axios from '../axios'
import { getDetailPost } from '../redux/detailPostSlice'


const Post = () => {
     const { id } = useParams()
     const [post, setPost] = useState([])

     const { auth, detailPost } = useSelector(state => state)
     const dispatch = useDispatch()

     useEffect(() => {
          const getPost1 = async()=>{

               try {

                    const res = await axios.get(`/api/get-post/${id}`,{
                         headers: { Authorization: auth.accesstoken }
                    })
                    console.log(res)
                    setPost(res.data.post)
             
                    
               } catch (err) {
                    console.log(err)
               }
          }
          if(auth.accesstoken){
               getPost1()

          }
    
     }, [id, auth.accesstoken,dispatch])
     useEffect(() => {
          /* dispatch(getPost({ detailPost, id, auth })) */
          getDetailPost({ detailPost, id, auth,dispatch })
       /*    if (detailPost.post.length > 0) {
               const newArr = detailPost.filter(post => post._id === id)
               setPost(newArr)
          } */
     }, [detailPost, dispatch, id, auth])

     return (
          <div className="sm:mx-10 md:mx-32">
               {
                    post.length === 0 &&
                    <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
               }

               {
                    post.length !== 0 &&
                         <PostCard key={post?._id} post={post} />
                  
               }
          </div>
     )
}

export default Post