import { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import moment from "moment";
import axios from "../../../axios";
/* import { END_POINT } from "../../../utils/constant"; */
import { useSelector } from "react-redux";

/* import { MainContext } from "../../../context/MainContext"; */
const { Option } = Select;
const { Item } = Form;
function AddNewSubject({ onClose, data, refetchData }) {
     const [dataEdit, setDataEdit] = useState({ ...data });
     const [loading, setLoading] = useState(false);
     const [isDisable, setIsDisable] = useState(false);
     /*  console.log("data là", dataEdit); */

     const { auth } = useSelector(state => state)
     const acceptEditCareer = async () => {
          setLoading(true);
          // setIsDisable(true);
          try {
               console.log(dataEdit)

               console.log({
                    subject: dataEdit.subject._id,
                    student: dataEdit.candidate._id,
                    taSchedule: dataEdit._id
               })
               const approve = {
                    subject: dataEdit.subject._id,
                    student: dataEdit.candidate._id,
                    taSchedule: dataEdit._id
               }
               const res = await axios.patch(`api/approve-ta`, approve, {
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
                                   Approve TA
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
                                   label="StudentId"
                                   name="studentId"

                              >
                                   <Input
                                        value={dataEdit.studentId}

                                   />
                              </Item>
                              <Item
                                   label="Tên Sinh viên"
                                   name="fullName"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng nhập tên công việc",
                                        },
                                   ]}
                              >
                                   <Input
                                        value={dataEdit.fullName}

                                   />
                              </Item>
                              <Item
                                   label="GpaTotal"
                                   name="gpaTotal"

                              >
                                   <Input
                                        value={dataEdit.gpaTotal}

                                   />
                              </Item>
                              <Item
                                   label="GpaSubject"
                                   name="gpaSubject"

                              >
                                   <Input
                                        value={dataEdit.gpaSubject}

                                   />
                              </Item>

                              {/*  <Item
                                   label="Hạn nộp hồ sơ"
                                   name="deadline"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui lòng chọn hạn nộp",
                                        },
                                   ]}
                              >
                                   <DatePicker
                                        onChange={(e, dateString) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  deadline: dateString,
                                             })
                                        }
                                   />
                              </Item> */}


                              {/*       <Item label="Trạng thái">
                                   <Select
                                        value={dataEdit.state}
                                        onChange={(value) =>
                                             setDataEdit({
                                                  ...dataEdit,
                                                  state: value,
                                             })
                                        }
                                   >
                                        <Option value="Đang mở">
                                             <div className="text-green-600 font-bold">Mở</div>
                                        </Option>
                                        <Option value="Đã đóng">
                                             <span className="text-red-600 font-bold">Đóng</span>
                                        </Option>
                                   </Select>
                              </Item> */}
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
                                        Approve
                                   </Button>
                              </div>
                         </Form>
                    </div>
               </div>
          </>
     );
}

export default AddNewSubject;
