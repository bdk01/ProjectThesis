import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const PostThumb = ({posts, result}) => {
    const { theme } = useSelector(state => state)
    const { t } = useTranslation();
    if(result === 0) return <h2 className="text-center text-danger">{t('No Post')} </h2>

    return (
        <div className="w-[100%] grid justify-center overflow-hidden my-[15px] grid-flow-col auto-cols-[minmax(0,_3fr)] gap-4">
            {
                posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`}>
                        <div className="min-w-[300px] h-[300px] w-[100%] relative cursor-pointer overflow-hidden">

                            {
                                post.images[0].url.match(/video/i)
                                ?<video controls src={post.images[0].url} alt={post.images[0].url} className='w-[100%] h-[100%] block  object-cover'
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />

                                :<img src={post.images[0].url} alt={post.images[0].url} className='w-[100%] h-[100%] block  object-cover'
                                style={{filter: 'invert(0)'}} />
                            }

                            <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#0008] flex justify-center items-center opacity-0 transition-all hover:opacity-[1] ;">
                                <i className="far fa-heart text-base text-white mx-[25px]">{post.likes.length}</i>
                                <i className="far fa-comment text-base text-white mx-[25px]">{post.comments.length}</i>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default PostThumb
