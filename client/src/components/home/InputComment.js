import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../api/postAPI'
import { Button } from 'antd'
/* import { createComment } from '../../redux/actions/commentAction' */
/* import Icons from '../Icons' */

const InputComment = ({children, post, onReply, setOnReply}) => {
    const [content, setContent] = useState('')

    const { auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
                console.log('submit comment')
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOnReply(false);
            return;
        }

        setContent('')
        
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
      await  createComment(dispatch,post,newComment,auth)
       /*  dispatch(createComment({post, newComment, auth, socket})) */

        if(setOnReply) return setOnReply(false);
    }

    return (
       /*  <form className="bg-gray-200  rounded-full relative py-2 flex" onSubmit={handleSubmit} >
            {children}
            <input type="text" placeholder="Add your comments..." className='mx-3 bg-transparent w-[85%] shadow-none'
            value={content} onChange={e => setContent(e.target.value)}
           />

     

            <button type="submit" className="postBtn">
                Post
            </button>
        </form> */
         <form className="card-footer comment_input" onSubmit={handleSubmit} >
            {
                children ?
                <div>
                         {children}
                    <input type="text" placeholder="Add your comments..."
                    value={content} onChange={e => setContent(e.target.value)} className='w-[75%] lg:w-[75%] mr-2 bg-transparent'
                    />

        

            <button type="submit" className="bg-blue-300 text-black py-2 px-3 rounded-lg">
                Post
            </button>
                </div>
    :
    <div>
              <div>
                    <input type="text" placeholder="Add your comments..."
                    value={content} onChange={e => setContent(e.target.value)} className='w-[90%] mr-2'
                   />

        

            <button  type="submit" className="bg-blue-300 text-black py-2 px-3 rounded-lg">
                Post
            </button>
                </div>
    </div>
            }
       
        </form>
           
    )
}

export default InputComment
