import { useState, useEffect, useContext } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import axios from "../../../axios"
import { useSelector } from "react-redux";

const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;
function AddNewSchedule({ onClose, refetchData }) {
     const { auth } = useSelector(state => state)
     const [data, setData] = useState({

          subjectName: "",
          description: "",
          teacher: "",
     });
     const [teacher, setTeacher] = useState([]);
     const [IdTeacher, setIdTeacher] = useState('');
     const [loading, setLoading] = useState(false);
     const [isDisable, setIsDisable] = useState(false);
     useEffect(() => {
          const fetchDepartmentsList = async () => {
               try {
                    const { data: response } = await axios.get(`/api/user/searchAll`);
                    console.log(response)
                    setTeacher(response.users);
               } catch (error) {
                    console.log(error);
               }
          };
          fetchDepartmentsList();
     }, []);
     const acceptNewSubject = async () => {
          setLoading(true);
          // setIsDisable(true);
          try {
     
     
             const data1 =   await axios.post(`/api/create-subject`, data, {
                    headers: { Authorization: auth.accesstoken }
               });
          
               setLoading(false);
               setIsDisable(false);
               onClose();
               refetchData();
          } catch (error) {
               console.log(error)
          }
     };
     return (
          <>
               <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
                    <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
                         <div className="flex justify-between items-center gap-y-3">
                              <span className="text-xl uppercase font-bold h-fit">
                                   Add subject
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
                              autoComplete="off"
                              onFinish={acceptNewSubject}
                              labelCol={{
                                   span: 6,
                              }}
                              wrapperCol={{
                                   span: 14,
                              }}
                              layout="horizontal"
                         >
                              <Item
                                   label="Subject Name"
                                   name="subjectName"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng nhập tên công việc",
                                        },
                                   ]}
                              >
                                   <Input
                                        value={data.subjectName}
                                        onChange={(e) =>
                                             setData({
                                                  ...data,
                                                  subjectName: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                           
                              <Item
                                   name="description"
                                   label="Mô tả"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng nhập mô tả",
                                        },
                                   ]}
                              >
                                   <TextArea
                                        rows={3}
                                        placeholder="Tối đa 1000 kí tự"
                                        maxLength={1000}
                                        value={data.description}
                                        onChange={(e) =>
                                             setData({
                                                  ...data,
                                                  description: e.target.value,
                                             })
                                        }
                                   />
                              </Item>
                      
                        
                              <Item
                                   name="teacher"
                                   label="Teacher"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng chọn thông tin",
                                        },
                                   ]}
                              >
                                   <Select
                                        allowClear 
                                        onChange={(_, option) => setData({
                                             ...data,
                                             teacher: option?.key,
                                        })}
                                   >
                                        {teacher.map((department) => (
                                             <Option value={department.fullname} key={department._id}>
                                                  {department.fullname}
                                             </Option>
                                        ))}
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
                                        className="rounded-lg"
                                   >
                                        Xác nhận
                                   </Button>
                              </div>
                         </Form>
                    </div>
               </div>
          </>
     );
}

export default AddNewSchedule;