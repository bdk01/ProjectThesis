
import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,


  MRT_Row,
  MRT_EditActionButtons,
  MRT_TableOptions,
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  MRT_ToggleDensePaddingButton,
  MRT_TopToolbar,
  MRT_GlobalFilterTextInput,
  MRT_Icons,
} from 'mantine-react-table';
import axios from 'axios';
import { ActionIcon, Box, Button, Container, Flex, Grid, Menu, Paper, Select, Stack, Table, Text, Title, Tooltip, useMantineTheme } from '@mantine/core';

import { FaRegShareSquare } from "react-icons/fa";
import { BsEyeFill, BsThreeDots } from "react-icons/bs";
import { AiOutlineRobot } from "react-icons/ai";
/* import { download, generateCsv, mkConfig } from 'export-to-csv'; */
import { Icon12Hours, IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import {  useCreateUser, useGetUsers, useUpdateUser, useDeleteUser } from './users-hook';

import {  Switch } from 'antd';

import { Modal } from 'antd';
/* import { useCreateUser } from './users-hook'; */



const ProfileTable = () => {
  const { confirm } = Modal;
 
  const { colorScheme } = useMantineTheme();
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const handleCreateUser/* : MRT_TableOptions<User>['onCreatingRowSave']  */= async ({
    values,
    exitCreatingMode,
  }) => {
    /*  const newValidationErrors = validateUser(values);
     if (Object.values(newValidationErrors).some((error) => error)) {
       setValidationErrors(newValidationErrors);
       return;
     }
     setValidationErrors({}); */
    await createUser(values);
    exitCreatingMode();
  };

  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  //UPDATE action
  const handleSaveUser/* : MRT_TableOptions<User>['onEditingRowSave']  */= async ({
    values,
    table,
  }) => {
    console.log(values)
    await updateUser(values);
    console.log('gg')
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {

 

    confirm({
      title: 'Are you sure you want to delete this user??',

      content: ` Are you sure you want to delete ${row.original.username}.This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteUser(row.original)
      },
      onCancel() {

      },
    });

  }


  const columns = useMemo(
    () => [

      {
        accessorKey: '_id',
        header: 'Stt',
        size: 80,
      },
      {
        accessorKey: 'email',
        header: 'Name Profile',
        size: 300,
      },
      {
        accessorKey: 'username',
        header: 'Group',
        size: 150,

      },
      {
        accessorKey: 'fullname',
        header: 'Platform',
        size: 10,
        enableResizing: false,

        Cell: ({ renderedCellValue, row }) => (

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0px',
            }}
          >
          

               {renderedCellValue == 'android' &&
              <img
                alt="avatar"
                height={30}
                width={32}
                src='/icon/platform/android.svg'
              />
            }
               {renderedCellValue == 'ios' &&
              <img
                alt="avatar"
                height={30}
                width={32}
                src='/icon/platform/ios.svg'
              />
            }
               {renderedCellValue == 'macos' &&
              <img
                alt="avatar"
                height={30}
                width={32}
                src='/icon/platform/macos.svg'
              />
            }
               {renderedCellValue == 'ubuntu' &&
              <img
                alt="avatar"
                height={30}
                width={32}
                src='/icon/platform/ubuntu.svg'
              />
            }
               {renderedCellValue == 'windows' &&
              <img
                alt="avatar"
                height={30}
                width={32}
                src='/icon/platform/windows.svg'
              />
            }


          </Box>
        ),
      },
      {
        accessorKey: 'fullname2',
        header: 'Type',
        size: 10,
        Cell: ({ renderedCellValue, row }) => (

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
            }}
          >


          </Box>
        ),

      },
      {
        accessorKey: 'fullname212',
        header: 'Country',
        size: 20,
        Cell: ({ renderedCellValue, row }) => (

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
            }}
          >

          </Box>
        ),

      },
      {
        accessorKey: 'phon4e',
        header: 'Proxy',
        size: 150,
      }
      ,
      {
        accessorKey: 'fullname1',
        header: 'Status',
        size: 60,
        Cell: ({ renderedCellValue, row }) => (
          /*   <Box
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue<string>() == 'bui dang khoa'
                    ? theme.colors.red[7]
                    : cell.getValue<string>() == 'gg' &&
                      cell.getValue<string>() == 'van'
                    ? theme.colors.yellow[7]
                    : theme.colors.green[7],
                borderRadius: '4px',
                color: '#fff',
                maxWidth: '9ch',
                padding: '4px',
        
              })}
            >
              {cell.getValue<string>()?.toLocaleString()}
            </Box> */
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {
              renderedCellValue == 'on' &&
              <img
                alt="avatar"
                height={30}
                src='/cloud-on.svg'
                style={{ borderRadius: '50%' }}
              />
            }
            {
              renderedCellValue == 'off' &&
              <img
                alt="avatar"
                height={30}
                src='/cloud-off.svg'
                style={{ borderRadius: '50%' }}
              />
            }
          </Box>
        ),
      }
    ],
    [],
  );

  //Manage MRT state that we want to pass to our API
  const [columnFilters, setColumnFilters] = useState(
    [],
  );

  const [columnFilterFns, setColumnFilterFns] = //filter modes
    useState(
      Object.fromEntries(
        columns.map(({ accessorKey }) => [accessorKey, 'contains']),
      ),
    ); //default to "contains" for all columns
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageIndex1, setPageIndex1] = useState(0);
  //call our custom react-query hook
  const { data, isError, isFetching, isLoading, refetch } = useGetUsers({
    columnFilterFns,
    columnFilters,
    globalFilter,
    pagination,
    sorting,
  });

  //this will depend on your API response shape
  const fetchedUsers = data?.users ?? [];
  const totalRowCount = data?.length ?? 0;
  const onChange/* : PaginationProps['onChange']  */= (page, pageSize) => {

    setPageIndex1(page)

    console.log(page, pageSize)

    setPagination({ pageIndex: pageIndex1, pageSize: pageSize })
    /*   setPageIndex1(0) */
    console.log(pagination)
  };
 
  const table = useMantineReactTable({
    columns,
    data: fetchedUsers,
    /*   enableColumnFilterModes: true, */
    /*   columnFilterModeOptions: ['contains', 'startsWith', 'endsWith'], */
    /*   initialState: { showColumnFilters: true }, */
    enableRowSelection: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    paginationDisplayMode: 'pages',
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableColumnActions: false,
    positionToolbarAlertBanner: 'none',
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilterModes: false,
    enableColumnFilters: false,
    enableRowNumbers: true,
    rowNumberMode: 'static',
    positionActionsColumn: 'last',
    initialState: { density: 'xs', columnVisibility: { _id: false }, showGlobalFilter: true, },
    positionExpandColumn: "last",
    mantineToolbarAlertBannerProps: isError
      ? {
        color: 'red',
        children: 'Error loading data',
      }
      : undefined,

    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,

    /*   onCreatingRowCancel: () => setValidationErrors({}), */
    onCreatingRowSave: handleCreateUser,
    /* onEditingRowCancel: () => setValidationErrors({}), */
    onEditingRowSave: handleSaveUser,

   
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Create New User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Edit User</Title>
        {internalEditComponents}
       
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>

      </Stack>
   
    ),

    renderRowActions: ({ row, table }) => (
      <div className='flex items-center '>
        
     
            <button className='flex items-center' onClick={() => table.setEditingRow(row)}>
              <div className='flex items-center'>
                <IconEdit className='mr-1' /> 
              </div>
            </button>
            <button className='flex items-center' onClick={() => openDeleteConfirmModal(row)}>
              <div className='flex items-center'>
                <IconTrash className='mr-1' />
              </div>
            </button>
         

      </div>
    ),

    rowCount: totalRowCount,
    mantinePaperProps: {
      shadow: 'none',
      sx: {
        borderRadius: '0',
        border: '1px dashed #e0e0e0',
      },
    },

    mantineTableProps: {
      striped: true,


      highlightOnHover: false,
      withColumnBorders: true,
      withBorder: colorScheme === 'light',
      sx: {
   

      /*   'thead > tr': {
          backgroundColor: '#f5f5f5',
          borderRadius: '300px',


        }, */
     /*    'thead > tr > th': {
          backgroundColor: colorScheme,
      },
      'tbody > tr > td': {
          backgroundColor: colorScheme,
      }, */
        'thead > tr >td ': {
          backgroundColor:  colorScheme,
          padding:0,
          margin:0
        },
     /*    'tbody > tr:has(.matine-TableBodyCell-DetailPanel) > td': {
          backgroundColor: 'gold',
          padding:0,
          margin:0
        },
        'tbody > tr:has(.matine-TableBodyCell-DetailPanel)': {
        
          padding:0,
          margin:0
        }, */
      },
    },

    enableStickyHeader: true,
    mantineTableContainerProps: { sx: { maxHeight: '500px' } },
    //sear
    mantineSelectCheckboxProps: {
      color: colorScheme, //makes all checkboxes use a different color other than the primaryColor
      size: "md",
        sx:{
         /*  backgroundColor:'orange', */
          width:'12px'
        }

    },
    displayColumnDefOptions: {
      'mrt-row-select': { size: 0 }, 'mrt-row-expand': { size: 10 },
      'mrt-row-numbers': {
        size: 10,
      }
      ,

    },
    mantineSelectAllCheckboxProps: {
      color: 'dark', //makes all checkboxes use a different color other than the primaryColor
      size: "md",
       sx:{
        /*  backgroundColor:'orange', */
         width:'16px'
       }
    },
    mantineSearchTextInputProps: {
      placeholder: 'Type to search',
      sx: { minWidth: '300px', backgroundColor: 'gray' },
      variant: 'filled',
    },
    enableGlobalFilterModes: false,
    /*  initialState={{
       showGlobalFilter: true,
     }}, */
 

    positionGlobalFilter: "left",
    defaultColumn: { minSize: 10, maxSize: 800, size: 10 },
   
    state: {
      showGlobalFilter: true,
      columnFilterFns,
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,

    },
  });

  return (
    <>
      <Container className='max-w-[100%]'>
        <Box sx={{ padding: '16px' }}>
          <Paper className='flex  rounded-xl py-5 px-5  justify-center items-center z-2 shadow-2xl border-[1px] border-gray-300 border-solid'>
            {/*   <MRT_TopToolbar  table={table}  /> */}
            <Paper className='flex justify-between items-center w-[100%] '>
              <div className='flex items-center'>
            
                <MRT_GlobalFilterTextInput table={table} />
              </div>

              <div className='flex justify-between '>


            
            
  
       
 

              </div>

            </Paper>
          {/*   <div className=" w-[180px] h-[44px] z-[20] ">
              <div className='!frame'>

                <button onClick={()=>router.push('/profile/create-profile')} className='btn-9 custom-btn flex flex-row items-center'>
                  <Image src='/icon/create-profile.svg' className='text-white mr-2 font-extrabold ' width={24} height={24} alt='#' />   <div  className='font-bold text-[14px] text-center ' > Create Profile</div>
                </button>
              </div>
            </div> */}
            <Button>wqwdq</Button>
          </Paper>

          {/* </Flex> */}
          {/* Some Page Content */}
          <Text p="3px 4px">

          </Text>
          {/* The MRT Table with no toolbars built-in */}
          <Paper className=' shadow-2xl rounded-3xl px-3 py-3 border-[1px] border-solid border-gray-300 '>

            <MRT_TableContainer table={table}  />
            {/* Our Custom Bottom Toolbar */}
            <Box>
              <Flex justify="flex-end">
                <MRT_TablePagination table={table} />
              </Flex>

            </Box>
          </Paper>
        </Box>
      </Container>
      </>

  )


};

export default ProfileTable;

