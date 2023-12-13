
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DatePicker, Space, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import axios from '../../axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/helper";
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
const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  
  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
/*   const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  }); */
  const disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };
export default function CreateTaSchedule1() {
     async function fetchUserList(subject) {
          /*  console.log('fetching user', username); */
          return await axios.get(`/api/subject/search?subject=${subject}&&user=${auth.user._id}`)
               .then((response) => response.data)
               .then((data) =>
                    data.subjects.map((subject) => ({
                         label: `${subject.subjectName}`,
                         value: subject._id,
                    }))
     
               );
     }
     const navigate = useNavigate();
     const { auth } = useSelector(state => state)
     const [information, setInformation] = useState({
          requirement: "",
     });
     const [date, setDate] = useState('')
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
          let start = dayjs(dateString).format('YYYY-MM-DDTHH:mm:ssZ')
         /*  let end = dayjs(dateString[1].$d).format('YYYY-MM-DDTHH:mm:ssZ') */
         console.log(start)
      /*    let gg =dayjs(start).unix()
         console.log(gg) */
         setDate(start)
         
         /*  setDate(start)
          console.log(dateString) */
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
          console.log({
               subject: form.attendees[0], requirement: form.requirement,dateCloseForm:date })
          try {
               const response = await axios.post('/api/create-taSchedule', {
              subject: form.attendees[0], requirement: form.requirement,dateCloseForm:date}, {
                    headers: { Authorization: auth.accesstoken },
               })
               console.log(response)
               showNotification('success','You create this form success')
               navigate(`/manageTaSchedule`);
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
                                   Create form for applying t.a
                              </div>

                         </div>
                         <form className="  my-4  " onSubmit={handleSubmit}>
                              <div className="  justify-items-start mx-3 ">

                                 
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                  Requirement:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">
                                             <input
                                                  className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  w-[100%]  line-clamp-1"
                                                  type="text"
                                                  name="requirement"
                                                  onChange={handleForm}
                                                  defaultValue={information.requirement}
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
                                           {/*   <RangePicker
                                                  size={50}
                                                  showTime={{ format: 'HH:mm' }}
                                                  format="YYYY-MM-DD HH:mm:00"
                                                  onChange={onChangeDate}
                                                  onOk={onOk}
                                             /> */}
                                              <DatePicker
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={disabledDate}
                                          /*   disabledTime={disabledDateTime} */
                                            showTime={{
                                                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                                            }}
                                            onOk={onOk}
                                            onChange={onChangeDate}
                                            />

                                        </div>
                                   </div>
                                   <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                        <div className="flex items-center   justify-start w-[140px]">
                                             <label className=" mr-3  font-semibold lg:text-lg text-base">
                                                  Subject:
                                             </label>
                                        </div>
                                        <div className="flex  w-[70%]">

                                             <DebounceSelect

                                                  mode="multiple"
                                                  value={value}
                                                  placeholder="Select subject to recruit TA"
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
                                        <button onClick={() => setExist(false)} className="py-2 px-4 mt-2 mb-4 round-md font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm" type="submit">
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
