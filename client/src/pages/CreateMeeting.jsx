import React, { useEffect, useMemo, useRef, useState } from "react";
import { DatePicker, Space,Select,Spin } from 'antd';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import axios from '../axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
 /*  console.log('fetching user', username); */
  return  await axios.get(`/api/user/search?username=${username}`)
    .then((response) => response.data)
    .then((data) =>

      data.users.map((user) => ({
        label: `${user.fullname}`,
        value: user._id,
      }))
    
    );
}
export default function CreateMeeting() {
     const navigate = useNavigate()
       const { auth} = useSelector(state => state)
     const [information, setInformation] = useState({
          location:"",
          description:"",
           meetingName:""
     });
    const [date,setDate]=useState({
          startTime:"",
          endTime:""
     })
     const [value, setValue] = useState([]);
     const [attendees,setAttendees]=useState([])
     const [attendee,setAttendee]=useState([])
     const [form,setForm] = useState({})
     const [exist,setExist] = useState(true)
           useEffect(()=>{
           /*     if(exist){ */
          /*  if(exist){  */
               setAttendees([])
                    value.map(g=>{
                       attendees.push(g.value)
                    })
                  let  same = [...new Set(attendees)];
                    setAttendee(same)
             /*   } */  
          },[value])
          const onChangeDate = (value, dateString) => {
 
          };
          const onOk = (dateString) => {
          let start = dayjs(dateString[0].$d).format('YYYY-MM-DDTHH:mm:ssZ')
          let end = dayjs(dateString[1].$d).format('YYYY-MM-DDTHH:mm:ssZ')
          setDate({
          startTime:start,
          endTime:end
           })
          };
     const handleForm = (e) => {
          e.preventDefault();
          const { name, value } = e.target;
          setInformation({ ...information, [name]: value });

     };
     useEffect(()=>{
           setForm({
               ...information,
               ...date,
               attendees:attendee,
           })
      
           
     },[information,date,attendee])
     const HandleExist= (e)=>{

     }
     const handleSubmit = async(e)=>{
        
           e.preventDefault();
     
          try{
           
               const conversation = await axios.post('/api/create-conversation',{attendees:form.attendees},{
        headers: { Authorization: auth.accesstoken },
      })
   
                 const response = await axios.post('/api/create-event',{...form,conversation:conversation.data._id},{
          headers: { Authorization: auth.accesstoken },
          })
               navigate(`/conversation`, { replace: true })
          }
          catch(err){
               console.log(err)
          }
     }
  return <div className="flex flex-col ">
       <div>
            <div className=" relative">
                 <div className=" relative ">
                      <div className="flex justify-start flex-col  border-b-2  pl-4 pb-3 pt-3">
                           <div className="text-xl font-bold mb-1 lg:text-2xl mt-2">
                                Create Meeting Chat
                           </div>
                          
                      </div>
                      <form className="  my-4  " onSubmit={handleSubmit}>
                           <div className="  justify-items-start mx-3 ">

                                     <div className="flex mb-6 sm:py-1 flex-row   w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  font-semibold lg:text-lg text-base">
                                                    MeetingName:
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
                                                    Description:
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
                                               <label className=" mr-3 font-semibold lg:text-lg text-base">
                                                    Location:
                                               </label>
                                          </div>
                                          <div className="flex  w-[70%]">
                                               <input
                                                    className="outline-none bg-white border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="location"
                                                    onChange={handleForm}
                                                    defaultValue={information.location}
                                               />
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                                <label className=" mr-3  font-semibold lg:text-lg text-base">
                                                    Date:
                                               </label>
                                          </div>
                                          <div className="flex  w-[70%]">
                                                  <RangePicker
                                                  size={50}
                                                       showTime={{ format: 'HH:mm' }}
                                                       format="YYYY-MM-DD HH:mm:00"
                                                       onChange={onChangeDate}
                                                       onOk={onOk}
                                                  />
     
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                                <label className=" mr-3  font-semibold lg:text-lg text-base">
                                                    Attendees:
                                               </label>
                                          </div>
                                          <div className="flex  w-[70%]">
                                               
                                        <DebounceSelect
                                        
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
                                     <button onClick={()=>setExist(false)} className="py-2 px-4 mt-2 mb-4 round-md font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm" type="submit">
                                          Cập nhật
                                     </button>
                                </div>
                           </div>
                      </form>
                 </div>
            </div>
       </div>
  </div>;
}
