
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'



export function useCreateGroup() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ forumName,description,creator,isPrivate} ) => {
      
     const res=  await axios.post('/api/create-forum',{forumName,description,creator,isPrivate})
      console.log(res)
      
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['groups'] })
  })
}
export function useEditGroup() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ forumName,description,isPrivate,id} ) => {
      console.log({forumName,description,isPrivate,id})
     const res=  await axios.post(`/api/update-forum/${id}`,{forumName,description,isPrivate})
      console.log(res)
      
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['groups'] })
  })
}

export function useGetGroup({type,auth,page}) {
  return useQuery({
    queryKey: ['groups',{type,page}],
    queryFn: async () => {
      console.log(type)
      const response = await axios.get(`/api/Allforum?type=${type}&&page=${page}&&limit=${6}`,{
        headers: { Authorization: auth.accesstoken }
    })
     
      const { data } = response
      return data
    },
    staleTime: 30000
  })
}

export function useGetDetailGroup() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await axios.get('/api/Allforum')
     
      const { data } = response
      return data.forum
    },
    staleTime: 60000
  })
}

export function useDeleteGroups() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id,auth }) => {
  
     
      const { data} =  await axios.delete(`/api/delete-forum/${id}`, {
        headers: { Authorization: auth.accesstoken },
    })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['groups'] })
  })
}

export function useUpdateGroup() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({  forumName,description,isPrivate}) => {
     
     /*  await axios.get() */
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['groups'] })
  })
}
