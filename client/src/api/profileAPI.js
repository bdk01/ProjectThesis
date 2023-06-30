import axios from "../axios"
import { GetUserInf } from "../redux/authSlice";
import { followUser, getIds, getPosts, getUser, loading, unfollowUser } from "../redux/profileSlice";
import { DeleteData } from "../utils/helper";
import {  createNotify } from "./notifyAPI";

  export const getProfileUsers = async ( id, auth,dispatch ) => {
    dispatch(getIds(id))
    /*   dispatch(loading(true)) */
    try {
       const res =   axios.get(`/api/user/${id}`,  {
                headers: { Authorization: auth.accesstoken }
            })
       const res1 =    axios.get(`/api/user_posts/${id}`,  {
                headers: { Authorization: auth.accesstoken }
            })
      
            const users = await res;
        const posts = await res1;
       
            dispatch(getUser(users.data.user))
            dispatch(getPosts( {...posts.data, _id: id, page: 2}))
          /*   dispatch(loading(false)) */

    } catch (err) {
   
    }
}
  export const follow = async ({users, user, auth, dispatch} ) => {
     let newUser;
    
    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: [...user.followers, auth.user]}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: [...item.followers, auth.user]}
            }
        })
    }
    /*  dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser }) */
    dispatch(followUser(newUser))

    dispatch(GetUserInf({
            ...auth,
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }))


    try {
         const res =   axios.post(`/api/user/${user._id}/follow`,{},  {
                headers: { Authorization: auth.accesstoken }
            })
            console.log('success')
         /*     socket.emit('follow', res.data.newUser) */

      
        const msg = {
            id: auth.user._id,
            text: 'has started to follow you.',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}`,
        }
      
        /*     dispatch(createNotify({msg, auth, socket})) */
            dispatch(createNotify({msg, auth,dispatch}))
    } catch (err) {
   
    }
}
  export const unfollow = async ( {users, user, auth, dispatch}  ) => {
    let newUser;

    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: DeleteData(user.followers, auth.user._id)}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: DeleteData(item.followers, auth.user._id)}
            }
        })
    }
       dispatch(unfollowUser(newUser))

    dispatch(GetUserInf({
            ...auth,
             user: { 
                ...auth.user, 
                following: DeleteData(auth.user.following, newUser._id) 
            }
        }))

    try {
       const res =   axios.post(`/api/user/${user._id}/unfollow`,{},  {
                headers: { Authorization: auth.accesstoken }
            })
            console.log('success')

    } catch (err) {
   
    }
}