import { Table, Input } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";


import ConfirmModal from "../../components/Modal/ConfirmModal";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "../../axios"
import { useSelector } from "react-redux";
import EditSubject from "../../components/Admin/ManageSubject/EditSubject";
import AddNewSubject from "../../components/Admin/ManageSubject/AddNewSubject";
import { Excel } from "antd-table-saveas-excel";
import EditForum from "../../components/Admin/ManageForum/EditForum";



function ManageForum() {
     const { auth } = useSelector(state => state)
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);
     const [pagination, setPagination] = useState({
          current: 1,
          pageSize: 6,
          total: null,
     });
     const [isAddVisible, setIsAddVisible] = useState(false);
     const [isEditVisible, setIsEditVisible] = useState(false);
     const [isDeleteVisible, setIsDeleteVisible] = useState(false);
     const [isDisable, setIsDisable] = useState(false);
     const [idCompare, setIdCompare] = useState("");
     const [nameCompare, setNameCompare] = useState("");
     const [dataForEdit, setDataForEdit] = useState({});
     const [params, setParams] = useState({
          total: pagination.total,
          pageSize: pagination.pageSize,
          page: pagination.current - 1,
          keyword: null,
          sortBy: null,
          studentId: null,
          fullName: null,
          /*   type: null,
            location: null, */
          state: null,
     });
     const columns = [
          {
               title: "ForumName",
               dataIndex: "forumName",
               sorter: true,
          },
          {
               title: "Member",
               dataIndex: "attendees",
               render: attendees => <div>{attendees.length}</div>
              
          },
       
          {
               title: "Private",
               dataIndex: "isPrivate",
               render: isPrivate => <div>{isPrivate.toString()}</div>
              
          },

          {
               title: "Description",
               dataIndex: "description",
               sorter: true,
               /* render: (a) => <div>{a?.split("T")[0]}</div>, */
          },
         
         
        /*   {
               title: "SubjectTa",
               dataIndex: ['subjectTa', 'subjectName'],

          }, */
          /* {
               title: "Profile",
               dataIndex: "_id",
             
               render: text => <Link to={`/profile/${text}`}>Profile</Link>
          }, */
         
          {
               title: "Action",
               dataIndex: "action",
               render: (a, record) => (
                    <div className="flex flex-row gap-y-1 gap-x-3">
                         <button
                              className="flex items-baseline gap-x-1 hover:text-blue-600"
                              onClick={() => handleClickEdit(record)}
                         >
                              <AiFillEdit className="translate-y-[1px]" />
                              Update
                         </button>
                         <button
                              className="flex items-baseline gap-x-1 hover:text-red-600"
                              onClick={() => {
                                   setIsDeleteVisible(true);
                                   setIdCompare(record._id);
                                   setNameCompare(record.name);
                              }}
                         >
                              <AiOutlineDelete className="translate-y-[1px]" />
                              Delete
                         </button>
                    </div>
               ),
          },
     ];
     const newColumnExport = useMemo(() => {
          const arr = columns?.filter((col) => col.dataIndex !== 'action' )
          return arr
        }, [columns])
     const fetchData = async (params = {}) => {
          setLoading(true);
          /*  console.log(auth.accesstoken) */
          try {
             /*   const response = await axios.get(`/api/Allforum?type=${type}`,{
                    headers: { Authorization: auth.accesstoken }
                }) */
               const { data: response } = await axios.get(`/api/Allforums`,  {
                    headers: { Authorization: auth.accesstoken }
               });
               console.log(response)
               /*    console.log(data) */
               setData(response.forum);
               /*  setData(response.subjects.full); */
               setLoading(false);
               setPagination({
                    pageSize: params.pageSize,
                    current: params.page + 1,
                    total: response.length,
               });
          } catch (error) {
               console.error(error.message);
          }
     };
     useEffect(() => {

          fetchData(params);


     }, [params]);
     const handleTableChange = (newPagination, filters, sorter) => {
          const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
          setParams({
               ...params,
               ...filters,
               sortBy: sort,
               ...newPagination,
               page: newPagination.current - 1,
          });
     };
     const acceptDelete = async () => {
          // setLoading(true);
          setIsDisable(true);
          console.log(idCompare)
          try {
               const res = await axios.delete(`/api/delete-forum/${idCompare}`, {
                    headers: { Authorization: auth.accesstoken }
               });
               console.log(res)
               setLoading(false);
               // setIsDisable(false);
               fetchData({ ...pagination, page: pagination.current - 1 });
               setIsDeleteVisible(false);
          } catch (error) {
               console.log(error);
          }
     };
     const handleClickEdit = (record) => {
          setIsEditVisible(true);
          setDataForEdit(record);
     };
     const searchByKeyword = (value) => {
          setParams({
               ...params,
               page: 0,
               keyword: value,
          });
     };
     const handleExportExcel = () => {
       
          const excel = new Excel();
          excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(data, {
              str2Percent: true
            })
            .saveAs("Forum.xlsx");
        };
     return (
          <div className=" mt-2 overflow-x-auto">
               <div className="text-3xl text-center mb-2 md:hidden font-bold uppercase">Manage Forums</div>
               <div className="mx-3 flex md:flex-wrap justify-between mb-4">
                 

                    <span className="text-3xl font-bold uppercase hidden md:block">Manage Forums</span>

                   {/*  <Input.Search
                         className="w-1/3 lg:w-[400px]"
                         placeholder="Search"
                         onSearch={searchByKeyword}
                    /> */}
                  {/*   <button
                         className="px-4 py-2 border border-neutral-800 text-center hover:bg-slate-300"
                         onClick={() => setIsAddVisible(true)}
                    >
                         + Add forum
                    </button> */}
                    <button
                         className="px-4 py-2 border border-neutral-800 text-center bg-green-500"
                         onClick={handleExportExcel}
                         >
                         + Export
                    </button>
               </div>
               <Table
                    className="flex-1 z-0"
                    rowKey={(record) => record._id}
                    columns={columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    scroll={{ x: 500 }}
               />
               {isAddVisible && (
                    <AddNewSubject
                         onClose={() => setIsAddVisible(false)}
                         refetchData={() => fetchData(params)}
                    />
               )}
               {isEditVisible && (
                    <EditForum
                         onClose={() => setIsEditVisible(false)}
                         data={dataForEdit}
                         refetchData={() => fetchData(params)}
                    />
               )}
               <ConfirmModal //Modal delete career
                    isVisible={isDeleteVisible}
                    /* text={`xóa form  `} */ /* ${nameCompare} */
                    onClose={() => setIsDeleteVisible(false)}
                    loading={loading}
                    disable={isDisable}
                    onOk={acceptDelete}
               />
          </div>
     );
}

export default ManageForum;