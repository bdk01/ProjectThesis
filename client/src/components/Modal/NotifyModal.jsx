import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoNotice from '../../assets/img/notice.png'
import { Link } from 'react-router-dom'
/* import Avatar from './Avatar' */
import moment from 'moment'/* 
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction' */
import { deleteAllNotifies, isReadNotify } from '../../api/notifyAPI'

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleIsRead = (msg) => {
    
        isReadNotify({msg, auth,dispatch})
    }

    const handleSound = () => {
     /*    dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound}) */
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if(newArr.length === 0) return deleteAllNotifies({auth,dispatch})

        if(window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)){
            return deleteAllNotifies({auth,dispatch})
        }
    }

    return (
        <div style={{minWidth: '300px'}}>
            <div className="d-flex justify-content-between align-items-center px-3">
                <h3>Notification</h3>
                {
                    notify?.sound 
                    ? <i className="fas fa-bell text-danger" 
                    style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    onClick={handleSound} />

                    : <i className="fas fa-bell-slash text-danger"
                    style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    onClick={handleSound} />
                }
            </div>
            <hr className="mt-1" />

            {
                notify?.data.length === 0 &&

            <div className='flex justify-center items-center'>
            <img src={NoNotice} alt="NoNotice" className="w-40" />
            </div>

            }

            <div style={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
                {
                    notify?.data.map((msg, index) => (
                        <div key={index} className="px-3 mb-2 mt-1" >
                            <Link to={`${msg.url}`} className="d-flex text-dark align-items-center"
                            onClick={() => handleIsRead(msg)}>
                        
                              <div className='flex justify-center items-center'>
                                <img src={msg.user.avatar} alt="NoNotice" className="w-12 rounded-full" />
                                </div>
                                <div className="mx-1 flex-fill">
                                    <div>
                                        <strong className="mr-1">{msg.user.username}</strong>
                                        <span>{msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                </div>

                                {
                                    msg.image &&
                                    <div style={{width: '30px'}}>
                                        {
                                            msg.image.match(/video/i)
                                            ? <video src={msg.image} width="100%" />
                                            : <div>  <div className='flex justify-center items-center'>
                                <img src={msg.user.avatar} alt="NoNotice" className="w-12 rounded-full" />
                                </div> </div> 
                                        }
                                    </div>
                                }
                                
                            </Link>
                            <small className="text-muted d-flex justify-content-between ">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i className="fas fa-circle text-primary" />
                                }
                            </small>
                        </div>
                    ))
                }

            </div>

            <hr className="my-1" />
            <div className="text-right text-danger mr-2" style={{cursor: 'pointer'}}
            onClick={handleDeleteAll}>
                Delete All
            </div>

        </div>
    )
}

export default NotifyModal
