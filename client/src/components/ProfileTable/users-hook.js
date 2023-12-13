'use client';


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MRT_ColumnFilterFnsState, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from "mantine-react-table";

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
    
     
   
        await axios.post('http://localhost:8000/api/update-user',user)
    
      },
    
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  export  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
       
      const res=    await axios.post('http://localhost:8000/api/update-user',{ email:user.email,username:user.username, fullname:user.fullname,phone:user.phone,id:user._id })

      
      },
      //client side optimistic update
     /*  onMutate: (newUserInfo: User) => {
        queryClient.setQueryData(
          ['users'],
          (prevUsers: any) =>
            prevUsers?.map((prevUser: User) =>
              prevUser._id === newUserInfo._id ? newUserInfo : prevUser,
            ),
        );
      }, */
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  export  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
       
      const res=    await axios.delete(`http://localhost:8000/api/delete-user/${user._id}`)

      
      },
      //client side optimistic update
     /*  onMutate: (newUserInfo: User) => {
        queryClient.setQueryData(
          ['users'],
          (prevUsers: any) =>
            prevUsers?.map((prevUser: User) =>
              prevUser._id === newUserInfo._id ? newUserInfo : prevUser,
            ),
        );
      }, */
     onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  export function useGetUsers  ({
    columnFilterFns,
    columnFilters,
    globalFilter,
    sorting,
    pagination,
  })  {
    //build the URL (https://www.mantine-react-table.com/api/data?start=0&size=10&filters=[]&globalFilter=&sorting=[])
    /* const fetchURL = new URL(
      '/api/data',
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:8000'
        : 'https://www.mantine-react-table.com',
    ); */
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
      queryKey: ['users', fetchURL.href], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
      queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
      /* keepPreviousData: true, */ //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
      staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    });
  };