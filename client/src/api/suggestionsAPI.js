import { getUsers, loading } from "../redux/suggestionsSlice"
import axios from "../axios"
export const getSuggestions = async({auth,dispatch})  => {
    try {
      /*   dispatch({ type: SUGGES_TYPES.LOADING, payload: true }) */
        dispatch(loading(true))
       /*  /suggestionsUser */
        const res = await axios.get(`/api/suggestionsUser`,{
                         headers: { Authorization: auth.accesstoken }
                    })
                    console.log(res)
       /*  dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data }) */
                    dispatch(getUsers(res.data))
       dispatch(loading(false))
        
    } catch (err) {
     console.log(err)
    }
}