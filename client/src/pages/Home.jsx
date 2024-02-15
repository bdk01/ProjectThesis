import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../components/home/Status";
/* import RightHome from "../components/home/RightHome"; */
import { Select } from '@mantine/core';
import axios from '../axios'
import { getPosts } from "../api/postAPI";
import LoadIcon from '../assets/img/loading.gif'
import Posts from "../components/home/Posts";
import LoadMoreBtn from "../components/home/LoadMoreBtn";
import { getPost } from "../redux/postSlice";
import RightSideBar from "../components/home/RightSideBar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
/* import Posts from "../components/home/Posts"; */
export default function Home() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { auth, homePosts, status, suggestions } = useSelector(state => state)
    const [load, setLoad] = useState(false)
    const [value, setValue] = useState('-createdAt');
    const handleLoadMore = async () => {
        setLoad(true)
        /*   const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token) */
        console.log('handle')
        const res = await axios.get(`/api/get-posts?limit=${homePosts.page * 2}&filter=${value}`, {
            headers: { Authorization: auth.accesstoken }
        })
        console.log(res)
        dispatch(getPost({ ...res.data, page: homePosts.page + 1 }))

        setLoad(false)
    }

    useEffect(() => {
        if (auth.user.role === 'admin') {
            navigate(`/admin/statitics`);
        }
        if (auth.accesstoken || status.status) {
            getPosts(auth, dispatch, value)
        }
    }, [auth.accesstoken, dispatch, status,value])

    return <div className="mx-3">

        <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">
            <div className="space-y-5 flex-shrink-0 lg:px-14 sm:px-2 md:px-8 lg:w-7/12">
                <div className="flex justify-between items-center mt-4">
                    <h1 className="lg:text-3xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mb-3"> {t('New Feed')} </h1>
                    <Select
                     value={value} onChange={setValue} 
                        placeholder="Pick one"
                        data={[
                            { value: '-createdAt', label: t('New') },
                            { value: 'createdAt', label: t('Lastest') },
                          
                        ]}
                        
                    />
                </div>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Status />
                    {
                        homePosts.loading
                            ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                            : (homePosts.result === 0 && homePosts.posts.length === 0)
                                ? <h2 className="text-center"> {t('No Post')} </h2>
                                : <Posts />
                    }
                </Suspense>


                <div className="flex justify-center mt-6" id="toggle">

                    <LoadMoreBtn result={homePosts.result} page={homePosts.page}
                        load={load} handleLoadMore={handleLoadMore} />
                </div>

            </div>
            <div className="lg:w-5/12">
                {/*          <RightHome/> */}
                <RightSideBar />
            </div>
        </div>
    </div>;
}
