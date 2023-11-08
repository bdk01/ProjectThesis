import React, { Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCard from './UserCard'
import FollowBtn from '../buttons/FollowBtn'
import LoadIcon from '../../assets/img/loading.gif'
import { getSuggestions } from '../../api/suggestionsAPI'
import { useTranslation } from 'react-i18next'


const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    return (
        <div className="mt-3">
            <UserCard user={auth.user} />
            <div className="d-flex justify-content-between align-items-center my-2">
            <Suspense fallback={<h2>Loading...</h2>}>
                <h5 className="text-danger">{t('Suggestions for you')}</h5>
                </Suspense>
                {
                    !suggestions.loading &&
                    <i className="fas fa-redo" style={{cursor: 'pointer'}}
                    onClick={ () => getSuggestions({auth,dispatch}) } />
                }
            </div>
            {
                suggestions.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <div className="suggestions">
                    {
                        suggestions.users.map(user => (
                            <UserCard key={user._id} user={user} >
                                <FollowBtn user={user} />
                            </UserCard>
                        ))
                    }
                </div>
            }

          

        </div>
    )
}

export default RightSideBar
