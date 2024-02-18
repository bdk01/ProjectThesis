import axios from "../axios"
import { getDetailPost } from "../redux/detailPostSlice"

import { deleteOnePost, getPost, updatePost, } from "../redux/postSlice"
import { resetIds } from "../redux/profileSlice"
import { DeleteData, EditData, showNotification } from "../utils/helper"
import { createNotify } from "./notifyAPI"


  export const createPost = async ({content, images, auth,socket,dispatch}) => {
    try {
    
       const res =   await axios.post("/api/create-post", {content, images }, {
                headers: { Authorization: auth.accesstoken }
            })
         
            showNotification('success',"success create post")
          /*   console.log(res) */
        // Notify
        /* console.log(images) */
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content, 
            image: images[0].url
        }
        console.log(msg)
        dispatch(resetIds())
        dispatch(createNotify({msg, auth,dispatch, socket}))
    } catch (err) {
   
    }
}
  export const editPost = async ({content, images, auth, status,dispatch}) => {
     let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)
     if(status.post.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;
    try {
   /*   console.log('gg') */
      
      /*  if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl) */
        const res = await axios.post(`/api/update-post/${status.post._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, {
                headers: { Authorization: auth.accesstoken }
            })
              /*  dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost }) */
     /*    const res =   await axios.post("/api/create-post", {content, images }, {
                headers: { Authorization: auth.accesstoken }
            }) */
          /*   console.log(res.data) */
                 dispatch(updatePost(res.data.newPost))
                 dispatch(resetIds())
            showNotification('success',"success edit post")
     

    } catch (err) {
      console.log(err)
    }
}

  export const getPosts = async (auth,dispatch,value) => {
    try {

       const res =   await axios.get(`/api/get-posts?filter=${value}`, {
                headers: { Authorization: auth.accesstoken }
            })
            dispatch(getPost( {...res.data, page: 2}))
       
    } catch (err) {
      console.log(err)
    }
}
  export const getPostDetail = async (auth,dispatch,id) => {
    try {

               /*   console.log('qweqwe') */
                    const res = await axios.get(`/api/get-post/${id}`,{
                         headers: { Authorization: auth.accesstoken }
                    })
                  /*   console.log(res) */
                    return res.data
     
        /*     dispatch(getPost( {...res.data, page: 2})) */
       
    } catch (err) {
      console.log(err)
    }
}
  export const deletePost = async (post, auth, socket,dispatch) => {
    dispatch(deleteOnePost(post))
    try {

       const res =   await axios.delete(`api/post/${post._id}`, {
                headers: { Authorization: auth.accesstoken }
            })
         
            dispatch(resetIds())
       
    } catch (err) {
      console.log(err)
    }
}
export const reportPost = async (post,auth,dispatch,socket) => {
 /*  const newPost = {...post, likes: [...post.likes, auth.user]}
  dispatch(updatePost(newPost)) */
  try { 

     const res =   await axios.post(`/api/post/${post._id}/reportPost`,{}, {
              headers: { Authorization: auth.accesstoken }
          })
          console.log(res)
          showNotification('success',"You have report success")
      
     
  } catch (err) {
 
  }
}
  export const likePost = async (post,auth,dispatch,socket) => {

    const newPost = {...post, likes: [...post.likes, auth.user]}

     dispatch(updatePost(newPost))
    try { 
    /*   post/${post._id}/like */
       const res =   await axios.post(`/api/post/${post._id}/like`,{}, {
                headers: { Authorization: auth.accesstoken }
            })
          
           /*  alert("success like post") */
      /*       dispatch(getPost( {...res.data, page: 2})) */
       
    } catch (err) {
   
    }
}
  export const  unLikePost = async (post,auth,dispatch,socket) => {
        const newPost = {...post, likes: post?.likes.filter(like => like._id !== auth.user._id)}
      
/*  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost}) */
     dispatch(updatePost(newPost))
    try {

       const res =    await axios.post(`/api/post/${post._id}/unlike`,{}, {
                headers: { Authorization: auth.accesstoken }
            })
           
  
           
       
    } catch (err) {
   
    }
}
  export const  savePost = async (auth,dispatch) => {
    try {

       const res =   await axios.get("/api/get-posts", {
                headers: { Authorization: auth.accesstoken }
            })
          
  
            dispatch(getPost( {...res.data, page: 2}))
       
    } catch (err) {
   
    }
}
  export const unSavePost= async (auth,dispatch) => {
    try {

       const res =   await axios.get("/api/get-posts", {
                headers: { Authorization: auth.accesstoken }
            })
          
    
            dispatch(getPost( {...res.data, page: 2}))
       
    } catch (err) {
   
    }
}

  export const createComment= async (dispatch,post,newComment,auth) => {
    const newPost = {...post, comments: [...post.comments, newComment]}
    dispatch(updatePost(newPost))
    try {
    
          const data = {...newComment, postId: post._id, postUserId: post.user._id}
       const res =   await axios.post("/api/create-comment",data,{
                headers: { Authorization: auth.accesstoken }
            })
         
             const newData = {...res.data.newComment, user: auth.user}
             const newPost = {...post, comments: [...post.comments, newData]}
               dispatch(updatePost(newPost))
     
       /*      dispatch(getPost( {...res.data, page: 2})) */
       
    } catch (err) {
   
    }
}
  export const updateComment= async ({comment, post, content, auth,dispatch}) => {
     const newComments = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newComments}
    dispatch(updatePost(newPost))
    try {
          const res =    await axios.patch(`/api/comment/${comment._id}`,{content}, {
                headers: { Authorization: auth.accesstoken }
            })
         /*    console.log(res) */
      
       
    } catch (err) {
   
    }
}
  export const unLikeComment= async (comment, post, auth,dispatch) => {
    
    const newComment = {...comment, likes: DeleteData(comment.likes, auth.user._id)}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
   dispatch(updatePost(newPost))
    try {

       const res =   await axios.patch(`/api/comment/${comment._id}/unlike`,{}, {
                headers: { Authorization: auth.accesstoken }
            })
         
   
       
    } catch (err) {
   
    }
}
  export const likeComment= async (comment, post, auth,dispatch) => {
       const newComment = {...comment, likes: [...comment.likes, auth.user]}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
   dispatch(updatePost(newPost))
    try {

       const res =   await axios.patch(`/api/comment/${comment._id}/like`,{}, {
                headers: { Authorization: auth.accesstoken }
            })
           /*  console.log(res) */
   
       
    } catch (err) {
   
    }
}
  export const deleteComment= async ({post, auth, comment, socket,dispatch}) => {
  
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]
    
    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }
   
    dispatch(updatePost(newPost))
    try {
       deleteArr.forEach(async(item) => {
         await axios.delete(`/api/comment/${item._id}`, {
           headers: { Authorization: auth.accesstoken }
          })
        })
          /*  deleteDataAPI(`comment/${item._id}`, auth.token) */
          /*   const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                url: `/post/${post._id}`,
            }
    
            dispatch(removeNotify({msg, auth, socket})) */
    
 
       
    } catch (err) {
      console.log(err)
    }
}
export const getDPost = async({detailPost, id, auth,dispatch})  => {
 
   if(detailPost.posts.every(post => post._id !== id)){

        try {
           const res = await axios.get(`/api/get-post/${id}`,{
                         headers: { Authorization: auth.accesstoken }
                    })
                  
                  
                    dispatch(getDetailPost(res.data.post))
        } catch (err) {
          console.log('gg')
        }
    }
   
 
}