import { useDispatch, useSelector } from "react-redux";
import GroupComponent from "./Group";
import StatusModal from "../../components/Modal/StatusModal";
import Status from "../../components/home/Status";
import { Image } from "antd";
import { Suspense, useEffect, useState } from "react";
import { getForumPosts } from "../../api/postAPI";
import Posts from "../../components/home/Posts";
import LoadIcon from '../../assets/img/loading.gif'
import { useTranslation } from "react-i18next";
import { Button, Flex, Loader, Select, Text } from "@mantine/core";
import axios from "../../axios"
import { useParams } from "react-router-dom";
import RightSideForum from "./RightSideForum";
import { useGetForumDetail, useGetStatusForumDetail, useRequestJoinForumDetail } from "../../hooks/detail-forum-hook";
import forum from "../../assets/img/forum1.jpg"


export default function ForumDetailPage() {
    const { status } = useSelector(state => state.status)
    const { homePosts, auth } = useSelector(state => state)
    const [isPrivate, setIsPrivate] = useState(false)
    const [isJoining, setIsJoining] = useState('')
    const [isWaitingUser, setIsWaitingUser] = useState('')
    const [forumData, setForumData] = useState([])
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [value, setValue] = useState('-createdAt');
    const { id } = useParams()
    const { mutateAsync: requestJoin ,isLoading:loadingRequest,isSuccess } =useRequestJoinForumDetail()
    const { data, isError, isFetching, isLoading, refetch } = useGetForumDetail({
        auth,id
      })
    const { data:dataStatus,isLoading:loadingStatus } = useGetStatusForumDetail({
        auth,id
      })
     console.log('test',dataStatus)
    useEffect(() => {
        const call = async () => {

            try {

              

                if ( data.isPrivate === false || data.isPrivate===undefined) {
                    setIsPrivate(false)
                }else if(data.isPrivate === true) {
                setIsPrivate(true)
                }
                
                if ( dataStatus?.isJoin?.length > 0) {
                 
                    setIsJoining(true)
                } else {
                    if (dataStatus.waitingUsers.length > 0) {
                        setIsWaitingUser(true)
                    }
                }

                setForumData(data)
                
            }
            catch (err) {
                console.log(err)
            }
        }
        if(auth){
            call()

        }
    }, [loadingStatus,isLoading,isSuccess,auth,id,data])
   
    useEffect(() => {
        if ((auth.accesstoken || status.status)&& data &&!isFetching ) {
            getForumPosts(auth, dispatch, value, id)
        }
    }, [auth.accesstoken, dispatch, status, value, id,isFetching])
    const Joinhandle = async()=>{
       await requestJoin({id,auth})
       setIsWaitingUser(true)
    }
    if(isLoading){
        return <div>Loading</div>
    }
    return (

        <div className="overflow-y-auto">

            <Image
                preview={false}
                width={"100%"}
                height={450}
                alt='#'
                src={forum}
            />
            <Flex className="justify-center items-center mb-2">

                <Text size={40} fw={600}>
                    Forum:{data?.forumName}
                </Text>
            </Flex>
            {
                isPrivate &&  isJoining && !isLoading &&
           /*      data.isPrivate &&   dataStatus?.isJoin?.length >0 && !isLoading && */

                <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">
                    <div className="space-y-5 flex-shrink-0 lg:px-14 sm:px-2 md:px-8 lg:w-7/12">
                 
                        <Status type={'detailForum'} />
                        <Suspense fallback={<h2>Loading...</h2>}>

                            {
                                homePosts.loading
                                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                                    : (homePosts.result === 0 && homePosts.posts.length === 0)
                                        ? <h2 className="text-center"> {t('No Post')} </h2>
                                        : <Posts />
                            }
                        </Suspense>


                    </div>
                    <div className="lg:w-5/12">

                        <RightSideForum forumData={data} />
 
                    </div>
                </div>
            }
            {
                !isPrivate && !isLoading  &&
              /*   !data.isPrivate && !isLoading  && */

                <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">
                    <div className="space-y-5 flex-shrink-0 lg:px-14 sm:px-2 md:px-8 lg:w-7/12">

                        <Status type={'detailForum'} />
                        <Suspense fallback={<h2>Loading...</h2>}>

                            {
                                homePosts.loading
                                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                                    : (homePosts.result === 0 && homePosts.posts.length === 0)
                                        ? <h2 className="text-center"> {t('No Post')} </h2>
                                        : <Posts />
                            }
                        </Suspense>


                    </div>
                    <div className="lg:w-5/12">

                        <RightSideForum forumData={data} />

                    </div>
                </div>
            }
            {
                isPrivate && !isJoining && !isWaitingUser &&
              /*   data.isPrivate && dataStatus?.isJoin?.length ==0 && !dataStatus.waitingUsers && */
              
                <div className="flex justify-center items-center lg:space-x-10 lg:space-y-0 space-y-5 mt-2 flex-col">
                  {
                    loadingRequest && !isSuccess ? <Loader/> :
                        <>
                        
                            <Text size={32} fw={500}>
                        Please join the forum via this button
                    </Text>
                        <Button
                            variant='outline'
                            size='md'
                            className='mx-2 max-w-[200px]'
                            
                            radius='md'
                            onClick={Joinhandle}
                        >

                            Joining
                        </Button>
                        </>
                  }  
                    
                   
                </div>
            }
            {
                isPrivate && !isJoining && isWaitingUser &&
              /*  data.isPrivate &&  dataStatus?.isJoin?.length ==0 && dataStatus.waitingUsers && */

                <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5 mt-2">
                  
                    <Text size={32} fw={500}>
                    Please wait for creator accept
                </Text>
                   
                </div>
            }


        </div>
    )
}
