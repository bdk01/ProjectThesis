import { Table, Input } from "antd";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "../../axios"
import { useSelector } from "react-redux";




function ReviewTA() {
     const { auth } = useSelector(state => state)
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);
     const [pagination, setPagination] = useState({
          current: 1,
          pageSize: 2,
          total: null,
     });
   
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
               title: "MSSV",
               dataIndex: "studentId",
               sorter: true,
          },

          {
               title: "FullName",
               dataIndex: "fullname",
               sorter: true,
               render: (a) => <div>{a?.split("T")[0]}</div>,
          },
          {
               title: "Email",
               dataIndex: "email",
               sorter: true,
          },
          {
               title: "Phone",
               dataIndex: "phone",
           
          },

          {
               title: "SubjectTa",
               dataIndex: ['subjectTa', 'subjectName'],

          },
          {
               title: "Profile",
               dataIndex: "_id",
               /*  render: (a) => <a>{`$${URL}/a`}</a>, */
               render: text => <Link to={`/profile/${text}`}>Profile</Link>
          },

        
     ];
     const fetchData = async (params = {}) => {
          setLoading(true);
          /*  console.log(auth.accesstoken) */
          try {
               const { data: response } = await axios.get(`/api/getAllTa`, {
                    params
               }, {
                    headers: { Authorization: auth.accesstoken }
               });
               console.log(response)
               /*    console.log(data) */
               setData(response.taSchedules);
               /*  setData(response.taSchedules.full); */
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
   
 
     const searchByKeyword = (value) => {
          setParams({
               ...params,
               page: 0,
               keyword: value,
          });
     };
     return (
          <div className=" mt-2 overflow-x-auto">
               <div className="mx-3 flex justify-between mb-4">
                    <span className="text-3xl font-bold uppercase">All Information TA</span>

                    <Input.Search
                         className="w-1/3 lg:w-[400px]"
                         placeholder="Nhập từ khóa"
                         onSearch={searchByKeyword}
                    />
                  {/*   <button
                         className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
                         onClick={() => setIsAddVisible(true)}
                    >
                         + Thêm mới
                    </button> */}
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
        
           
          </div>
     );
}

export default ReviewTA;