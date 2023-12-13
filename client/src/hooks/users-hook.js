import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



/* const queryClient = useQueryClient(); */
/* export const useCreateUser =() =>  {
    return useMutation({
      mutationFn: async (user) => {

     
       async ()=>{
        await axios.post('http://localhost:8000/api/update-user',user)
       }
      },
    
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), 
    });
  } */
  
 /*  export  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
       
      const res=    await axios.post('http://localhost:8000/api/update-user',{ email:user.email,username:user.username, fullname:user.fullname,phone:user.phone,id:user._id })

      
      },
 
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), 
    });
  } */
/*   export  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
    
       
      const res=    await axios.delete(`http://localhost:8000/api/delete-user/${user._id}`)

      
      },
  
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  } */
/*   export function useGetUsers ({
    columnFilterFns,
    columnFilters,
    globalFilter,
    sorting,
    pagination,
  })  {

    const fetchURL = new URL(
      '/api/user/searchAll',
      process.env.NODE_ENV === 'production'
        ? 'https://www.mantine-react-table.com'
        : 'http://localhost:8000',
    );
    fetchURL.searchParams.set(
      'page',
      `${pagination.pageIndex }`,
    );
    fetchURL.searchParams.set('pageSize', `${pagination.pageSize}`);
    fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    fetchURL.searchParams.set(
      'filterModes',
      JSON.stringify(columnFilterFns ?? {}),
    );
    fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
    fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));
  
    return useQuery({
      queryKey: ['users', fetchURL.href],
      queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
 
      staleTime: 30_000, 
    });
  }; */