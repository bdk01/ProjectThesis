import { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import moment from "moment";
import axios from "../../../axios";
/* import { END_POINT } from "../../../utils/constant"; */
import { useSelector } from "react-redux";

/* import { MainContext } from "../../../context/MainContext"; */
const { Option } = Select;
const { Item } = Form;
function EditTA({ onClose, data, refetchData }) {
     const [dataEdit, setDataEdit] = useState({ ...data });
     const [loading, setLoading] = useState(false);
     const [isDisable, setIsDisable] = useState(false);
       
     const { auth } = useSelector(state => state)
  
     const acceptEditCareer = async () => {
          setLoading(true);
          // setIsDisable(true);
          try {
               console.log('gg')
             

             /*   console.log() */
               const approve = {
                    email: dataEdit.email,
                    username: dataEdit.username,
                    fullname: dataEdit.fullname,
                    role: dataEdit.role,
                    subjectTaId:dataEdit.subjectTa._id,
                    id:data._id
               }
               console.log(approve)
               const res = await axios.post(`/api/update-ta`, approve, {
                    headers: { Authorization: auth.accesstoken }
               });

              
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
                                  Update TA
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
                                   <Input  disabled={true}  value={dataEdit.fullname}>


                                   </Input>
                              </Item>
                              <Item
                                   label="User name"
                                   name="username"
                                   
                              >
                                   <Input  disabled={true} value={dataEdit.username}>
                                    

                                   </Input>
                                
                              
                              </Item>
                              <Item
                                   label="Email"
                                   name="email"
                                   
                              >
                                   <Input  disabled={true} value={dataEdit.email}>


                                   </Input>
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
                                        <Option value="ta">
                                             <span className="text-orange-500 font-bold">Teaching Assistant</span>
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
                                        Change
                                   </Button>
                              </div>
                         </Form>
                    </div>
               </div>
          </>
     );
}

export default EditTA;
