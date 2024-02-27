import { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import moment from "moment";
import axios from "../../../axios";

import { useSelector } from "react-redux";


const { Option } = Select;
const { Item } = Form;
function AddUser({ onClose,  refetchData }) {
     const initState = {
          fullname: '',username:'',email:'',password:''
      }
     const [dataEdit, setDataEdit] = useState(initState);
     const [loading, setLoading] = useState(false);
     const [isDisable, setIsDisable] = useState(false);
     
     const { auth } = useSelector(state => state)
      console.log(dataEdit)
     const acceptEditCareer = async () => {
          setLoading(true);
          // setIsDisable(true);
          try {
               console.log('gg')
          /*      console.log(dataEdit) */

         
               const approve = {
                    email: dataEdit.email,
                    username: dataEdit.username,
                    fullname: dataEdit.fullname,
                    role: dataEdit.role,
                    password:dataEdit.password,
                  
               }
               console.log(approve)
               const res = await axios.post(`/auth/registerAdmin`, approve, {
                    headers: { Authorization: auth.accesstoken }
               });

               console.log(res)
               setLoading(false);
               // setIsDisable(false);
               refetchData();
               onClose();
          } catch (error) {
               console.log(error);
          }
     };
     return (
          <>
               <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
                    <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
                         <div className="flex justify-between items-center gap-y-3">
                              <span className="text-xl uppercase font-bold h-fit">
                                Add new User
                              </span>
                              <Button
                                   size="large"
                                   disabled={isDisable}
                                   className={
                                        !isDisable &&
                                        "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
                                   }
                                   onClick={onClose}
                              >
                                   x
                              </Button>
                         </div>
                         <Form
                              labelCol={{
                                   span: 6,
                              }}
                              wrapperCol={{
                                   span: 14,
                              }}
                              layout="horizontal"
                              autoComplete="off"
                              initialValues={{
                                   ...dataEdit,
                                   deadline: moment(dataEdit.deadline)
                              }}
                              onFinish={acceptEditCareer}
                         >
                              <Item
                                   label="Full Name"
                                   name="fullname"

                              >
                                   <Input
                                        value={dataEdit.fullname}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  fullname: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                              <Item
                                   label="User name"
                                   name="username"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng nhập tên công việc",
                                        },
                                   ]}
                              >
                                   <Input
                                        value={dataEdit.username}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  username: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                              <Item
                                   label="Email"
                                   name="email"

                              >
                                   <Input
                                        value={dataEdit.email}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  email: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                              <Item
                                   label="Password"
                                   name="password"

                              >
                                   <Input.Password
                                 
                                        value={dataEdit.password}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  password: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                            

                               <Item label="Role">
                                   <Select
                                        value={dataEdit.role}
                                        onChange={(value) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  role: value,
                                             })
                                        }
                                   >
                                        <Option value="user">
                                             <div className="text-green-500 font-bold">User</div>
                                        </Option>
                                        <Option value="teacher">
                                             <span className="text-blue-500 font-bold">Teacher</span>
                                        </Option>
                                        <Option value="ta">
                                             <span className="text-orange-500 font-bold">Teaching Assistant</span>
                                        </Option>
                                        <Option value="admin">
                                             <span className="text-red-500 font-bold">Admin</span>
                                        </Option>
                                   </Select>
                              </Item>
                              <div className="flex justify-end mt-2 text-sm gap-x-6">
                                   <Button
                                        size="large"
                                        disabled={isDisable}
                                        className={
                                             !isDisable &&
                                             "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                                        }
                                        onClick={onClose}
                                   >
                                        Hủy
                                   </Button>
                                   <Button
                                        type="primary"
                                        size="large"
                                        loading={loading}
                                        htmlType="submit"
                                        className="rounded-lg bg-blue-400"
                                   >
                                        Submit
                                   </Button>
                              </div>
                         </Form>
                    </div>
               </div>
          </>
     );
}

export default AddUser;
