import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../components/home/Status";
import RightHome from "../components/home/RightHome";

import axios from '../axios'
import { getPosts } from "../api/postAPI";
import LoadIcon from '../assets/img/loading.gif'
import Posts from "../components/home/Posts";
import LoadMoreBtn from "../components/home/LoadMoreBtn";
import { getPost } from "../redux/postSlice";
import RightSideBar from "../components/home/RightSideBar";
/* import Posts from "../components/home/Posts"; */
export default function Home() {
    const dispatch = useDispatch()
    const {  auth,homePosts,status,suggestions } = useSelector(state => state)
    const [load, setLoad] = useState(false)
    const handleLoadMore = async () => {
        setLoad(true)
      /*   const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token) */
      console.log('handle')
        const res = await axios.get(`/api/get-posts?limit=${homePosts.page * 2}`, {
            headers: { Authorization: auth.accesstoken }
        })
        console.log(res)
        dispatch(getPost({ ...res.data, page: homePosts.page + 1 }))

        setLoad(false)
    }
    
    useEffect(() => {
        if (auth.accesstoken || status.status) {
            getPosts(auth, dispatch)
        }
    }, [auth.accesstoken, dispatch, status])

  return <div className="mx-3">
    <h1 className="lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mb-3"> New Feed </h1>
      <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">

                 
                    <div className="space-y-5 flex-shrink-0 lg:w-7/12">
                         <Status/>
                    {
                        homePosts.loading
                            ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                            : (homePosts.result === 0 && homePosts.posts.length === 0)
                                ? <h2 className="text-center">No Post</h2>
                                : <Posts />
                    }       
                     
                      
                    
                        <div className="flex justify-center mt-6" id="toggle">
                        
                  <LoadMoreBtn result={homePosts.result} page={homePosts.page}
                      load={load} handleLoadMore={handleLoadMore} />
                        </div>
 
                    </div>
                       <div className="lg:w-5/12">
                  {/*          <RightHome/> */}
                        <RightSideBar/>
                       </div>
         </div>
  </div>;
}
