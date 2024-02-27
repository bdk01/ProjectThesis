import { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import moment from "moment";
import axios from "../../../axios";

import { useSelector } from "react-redux";


const { Option } = Select;
const { Item } = Form;
function EditForum({ onClose, data, refetchData }) {
     const [dataEdit, setDataEdit] = useState({ ...data });
     const [loading, setLoading] = useState(false);
     const [isDisable, setIsDisable] = useState(false);
     console.log(data)
     const { auth } = useSelector(state => state)
  
     const acceptEditCareer = async () => {
          setLoading(true);
          // setIsDisable(true);
          try {
               console.log('gg')
              /*  console.log(dataEdit.profile.phone) */

             
               const approve = {
                    forumName: dataEdit.forumName,
                    description: dataEdit.description,
                   
                    isPrivate: dataEdit.isPrivate,
               }
               console.log(approve) /* (`/api/update-forum/${id}`,{forumName,description,isPrivate}) */
               const res = await axios.post(`/api/update-forum/${data._id}`, approve, {
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
                                  Edit User
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
                                   label="User name"
                                   name="description"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng nhập tên công việc",
                                        },
                                   ]}
                              >
                                   <Input
                                        value={dataEdit.description}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  description: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                              <Item
                                   label="ForumName"
                                   name="forumName"

                              >
                                   <Input
                                        value={dataEdit.forumName}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  forumName: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                           {/*    <Item
                                   label="Phone"
                                   name="phone"

                              >
                                   <Input
                                        value={dataEdit.profile.phone}
                                        onChange={(e) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  phone: e.target.value,
                                             })
                                        }
                                   />
                              </Item> */}

                               <Item label="IsPrivate">
                                   <Select
                                        value={dataEdit.isPrivate}
                                        onChange={(value) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  isPrivate: value,
                                             })
                                        }
                                   >
                                        <Option value="true">
                                             <div className="text-green-500 font-bold">True</div>
                                        </Option>
                                        <Option value="false">
                                             <span className="text-blue-500 font-bold">False</span>
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

export default EditForum;
