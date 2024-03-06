
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'



export function useRequestJoinForumDetail() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({id,auth}) => {
  
      const { data } =   await axios.post(`/api/requestJoin/${id}`,{},{
        headers: { Authorization: auth.accesstoken }
    })
 
    },

    onSettled: () =>{
      queryClient.invalidateQueries({ queryKey: ['forum-detail'] })
      queryClient.invalidateQueries({ queryKey: ['forum-status'] })
    }
  })
}
export function useAcceptJoinForumDetail() {

  const queryClient = useQueryClient()
  return useMutation({
    
    mutationFn: async ({userId,auth,id}) => {
    
      const { data } =   await axios.post(`/api/accept-join/${id}`,{userId},{
        headers: { Authorization: auth.accesstoken }
    })
    },
    onSettled: () =>{
      queryClient.invalidateQueries({ queryKey: ['forum-detail'] })
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      queryClient.invalidateQueries({ queryKey: ['forum-status'] })
    }
  })
}
export function useRejectJoinForumDetail() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({userId,auth,id}) => {
     
    
      const { data } =   await axios.post(`/api/reject-join/${id}`,{userId},{
        headers: { Authorization: auth.accesstoken }
    })
 
    },

    onSettled: () =>{
      queryClient.invalidateQueries({ queryKey: ['forum-detail'] })
      queryClient.invalidateQueries({ queryKey: ['forum-status'] })
    }
  })
}
export function useKickForumDetail() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({userId,auth,id}) => {
      
    
      const { data } =   await axios.post(`/api/kickMember/${id}`,{userId},{
        headers: { Authorization: auth.accesstoken }
    })
      console.log(data)
    },

    onSettled: () =>{
      queryClient.invalidateQueries({ queryKey: ['forum-detail'] })
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      queryClient.invalidateQueries({ queryKey: ['forum-status'] })
    }
  })
}
export function useJoinPublicForumDetail() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({userId,auth,id}) => {
      
    
      const { data } =   await axios.post(`/api/joinPublic/${id}`,{userId},{
        headers: { Authorization: auth.accesstoken }
    })
    console.log(data)
    },

    onSettled: () =>{
      queryClient.invalidateQueries({ queryKey: ['forum-detail'] })
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      queryClient.invalidateQueries({ queryKey: ['forum-status'] })
    }
  })
}


export function useGetForumDetail({
  auth,id
}) {
  return useQuery({
    queryKey: ['forum-detail',id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/forum/${id}`, {
        headers: { Authorization: auth.accesstoken },
    })
     
    
      return data[0]
    },
    staleTime: 40000
  })
}
export function useGetStatusForumDetail({
  auth,id
}) {
  return useQuery({
    queryKey: ['forum-status',id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/checkforum/${id}`, {
        headers: { Authorization: auth.accesstoken },
    })  
      return data
    },
    staleTime: 40000
  })
}

export function useDeleteForumDetail() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id,auth }) => {
     
    
      const { data} =  await axios.delete(`/api/delete-forum/${id}`, {
        headers: { Authorization: auth.accesstoken },
    }
    )
    },
    onSettled: () =>{
      queryClient.invalidateQueries({ queryKey: ['forum-detail'] })
      
      queryClient.invalidateQueries({ queryKey: ['forum-status'] })
    }
  })
}


