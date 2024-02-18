import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { DatePicker, Space, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import axios from '../axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;
function DebounceSelect({ fetchOptions, debounceTimeout = 500, ...props }) {
     const [fetching, setFetching] = useState(false);
     const [options, setOptions] = useState([]);
     const fetchRef = useRef(0);
     const debounceFetcher = useMemo(() => {
          const loadOptions = (value) => {
               fetchRef.current += 1;
               const fetchId = fetchRef.current;
               setOptions([]);
               setFetching(true);
               fetchOptions(value).then((newOptions) => {
                    /*    console.log(value)
                       console.log(newOptions)
                        */
                    if (fetchId !== fetchRef.current) {

                         return;
                    }
                    setOptions(newOptions);
                    setFetching(false);
               });
          };
          return debounce(loadOptions, debounceTimeout);
     }, [fetchOptions, debounceTimeout]);
     return (
          <Select
               labelInValue
               filterOption={false}
               onSearch={debounceFetcher}
               notFoundContent={fetching ? <Spin size="small" /> : null}
               {...props}
               options={options}
          />
     );
}
// Usage of DebounceSelect
async function fetchUserList(username) {

     return await axios.get(`/api/user/search?username=${username}`)
          .then((response) => response.data)
          .then((data) =>

               data.users.map((user) => ({
                    label: `${user.fullname}`,
                    value: user._id,
               }))

          );
}
export default function CreateMeeting() {
     const { t } = useTranslation();
     const navigate = useNavigate()
     const { auth } = useSelector(state => state)
     const [information, setInformation] = useState({
         /*  location: "", */
          description: "",
          meetingName: ""
     });
     const [date, setDate] = useState({
          startTime: "",
          endTime: ""
     })
     const [value, setValue] = useState([]);
     const [attendees, setAttendees] = useState([])
     const [attendee, setAttendee] = useState([])
     const [form, setForm] = useState({})
     const [exist, setExist] = useState(true)
     useEffect(() => {
          /*     if(exist){ */
          /*  if(exist){  */
          setAttendees([])
          value.map(g => {
               attendees.push(g.value)
          })
          let same = [...new Set(attendees)];
          setAttendee(same)
          /*   } */
     }, [value])
     const onChangeDate = (value, dateString) => {

     };
     const onOk = (dateString) => {
          let start = dayjs(dateString[0].$d).format('YYYY-MM-DDTHH:mm:ssZ')
          let end = dayjs(dateString[1].$d).format('YYYY-MM-DDTHH:mm:ssZ')
          setDate({
               startTime: start,
               endTime: end
          })
     };
     const handleForm = (e) => {
          e.preventDefault();
          const { name, value } = e.target;
          setInformation({ ...information, [name]: value });

     };
     useEffect(() => {
          setForm({
               ...information,
               ...date,
               attendees: attendee,
          })


     }, [information, date, attendee])
     const HandleExist = (e) => {

     }
     const handleSubmit = async (e) => {

          e.preventDefault();

          try {

               const conversation = await axios.post('/api/create-conversation', { attendees: form.attendees }, {
                    headers: { Authorization: auth.accesstoken },
               })

               const response = await axios.post('/api/create-event', { ...form, conversation: conversation.data._id }, {
                    headers: { Authorization: auth.accesstoken },
               })
               navigate(`/conversation`, { replace: true })
          }
          catch (err) {
               console.log(err)
          }
     }
     return <div className="flex flex-col ">
          <div>
               <div className=" relative">
                    <div className=" relative ">
                         <div className="flex justify-center items-center flex-col  border-b-2  pl-4 pb-3 pt-3">
                         <Suspense fallback={<h2>Loading...</h2>}>
                              <div className="text-xl font-bold mb-1 lg:text-4xl mt-2">
                              {t('creategroup')}
                              </div>
                              </Suspense >

                         </div>
                         <form className="  my-4 sm:mx-6 lg:mx-28" onSubmit={handleSubmit}>
                              <div className="  justify-items-start mx-3 ">

                                   <div className="flex mb-6 sm:py-1 flex-row   w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold lg:text-lg text-base">
                                                    {t('MeetingName')}:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">
                                             <input
                                                  className="outline-none  border-black bg-white border-[1px] sm:px-2 rounded-md py-[6px] px-1  text-base  w-[100%]  line-clamp-1"
                                                  type="text"
                                                  name="meetingName"
                                                  onChange={handleForm}
                                                  defaultValue={information.meetingName}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                       {t('Description')}:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">
                                             <input
                                                  className="outline-none bg-white border-black  border-[1px] sm:px-2 rounded-md py-[6px] px-1  text-base  w-[100%]  line-clamp-1"
                                                  type="text"
                                                  name="description"
                                                  onChange={handleForm}
                                                  defaultValue={information.description}
                                             />
                                        </div>
                                   </div>
                            
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold lg:text-lg text-base">
                                               
                                                  {t('Date')}:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">
                                             <RangePicker
                                                  size={50}
                                                  showTime={{ format: 'HH:mm' }}
                                                  format="YYYY-MM-DD HH:mm:00"
                                                  onChange={onChangeDate}
                                                  onOk={onOk}
                                                  className="border-[1px] border-black border-solid"
                                             />

                                        </div>
                                   </div>
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold lg:text-lg text-base">
                                               {t('Attendees')}:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">

                                             <DebounceSelect
            className="border-[1px] border-black border-solid"
                                                  mode="multiple"
                                                  value={value}
                                                  placeholder="Select users"
                                                  fetchOptions={fetchUserList}
                                                  onChange={(newValue) => {
                                                       setValue(newValue);

                                                  }}

                                                  style={{
                                                       width: '100%',
                                                  }}
                                             />

                                        </div>
                                   </div>

                              </div>
                              <div className="flex mb-3 ">
                                   <div className="flex items-center w-2/5  justify-end ">
                                        <label className="text-gray-500 mr-3  "></label>
                                   </div>
                                   <div className="flex ">
                                        <button onClick={() => setExist(false)} className="py-3 px-5 mt-2 mb-4 round-md font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm" type="submit">
                                              {t('update')}
                                        </button>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     </div>;
}
