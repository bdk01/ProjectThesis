import React, { useEffect, useMemo, useRef, useState } from "react";
import { DatePicker, Space, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import axios from '../../axios';
import { useSelector } from "react-redux";


export default function CreateSubject() {
     const { auth } = useSelector(state => state)
     const [information, setInformation] = useState({
          subjectName: "",
          description: "",
      
     });




     const handleForm = (e) => {
          e.preventDefault();
          const { name, value } = e.target;
          setInformation({ ...information, [name]: value });

     };


     const handleSubmit = async (e) => {

          e.preventDefault();

          try {
               console.log({ description: information.description, subjectName: information.subjectName })
               const conversation = await axios.post('/api/create-subject', { description: information.description, subjectName: information.subjectName },{
              headers: { Authorization: auth.accesstoken },
            })
            console.log(conversation)
            /*    const response = await axios.post('/api//create-subject',{...form,conversation:conversation.data._id},{
                headers: { Authorization: auth.accesstoken },
                }) */

          }
          catch (err) {
               console.log(err)
          }
     }
     return <div className="flex flex-col ">
          <div>
               <div className=" relative">
                    <div className=" relative ">
                         <div className="flex justify-start flex-col  border-b-2  pl-4 pb-3 pt-3">
                              <div className="text-xl font-bold mb-1 lg:text-2xl mt-2">
                                   Apply become T.A
                              </div>

                         </div>
                         <form className="  my-4  " onSubmit={handleSubmit}>
                              <div className="  justify-items-start mx-3 ">
                                  
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3 font-semibold lg:text-lg text-base">
                                                  subjectName:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">
                                             <input
                                                  className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  w-[100%]  line-clamp-1"
                                                  type="text"
                                                  name="subjectName"
                                                  onChange={handleForm}
                                                  defaultValue={information.subjectName}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                  description:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">
                                             <input
                                                  className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  w-[100%]  line-clamp-1"
                                                  type="text"
                                                  name="description"
                                                  onChange={handleForm}
                                                  defaultValue={information.description}
                                             />
                                        </div>
                                   </div>


                              </div>
                              <div className="flex mb-3 ">
                                   <div className="flex items-center w-2/5  justify-end ">
                                        <label className="text-gray-500 mr-3  "></label>
                                   </div>
                                   <div className="flex ">
                                        <button className="py-2 px-4 mt-2 mb-4 round-md font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm" type="submit">
                                             Submit
                                        </button>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     </div>;
}
