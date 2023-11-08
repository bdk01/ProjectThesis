import React, { useState } from "react";
import axios from '../axios'
import photo from '../assets/img/message2.svg'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../utils/helper";

export default function Profile1() {
      const [images, setImages] = useState(false)
       const { auth} = useSelector(state => state)
       const navigate = useNavigate()
          const [avatar, setAvatar] = useState(false)
          const [information, setInformation] = useState({
          name:"",
          email:"",
          phone:"",
          address:""
     });
       const handleUpload = async (e) => {
          console.log('fgf')
        e.preventDefault()
        try {

        /*     if (user.role !== 1) retuqrn alert("you are not admin") */
            const file = e.target.files[0]

            if (!file) return alert("file is not exist!")
            if (file.size > 1024 * 1024) return alert("Size is too large")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File is not the image")
            console.log(file)
            let formData = new FormData()
            formData.append('file', file);
            console.log(formData)
            console.log(auth.accesstoken)
            const res = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: auth.accesstoken }
            })
            console.log(res)
             setAvatar(res.data.url)
        }
        catch (err) {
            alert(err.respone.data.msg)
        }
    }
    
       const handleForm = async (e) => {
              e.preventDefault();
          const { name, value } = e.target;
          setInformation({ ...information, [name]: value });
          console.log(information)

    }
       const handleSubmit = async (e) => {

       try {
            axios.patch('/user/update', {
                name: information.name ? information.name : auth.user.name,
                avatar: avatar ? avatar : auth.user.avatar
            }, {
                headers: { Authorization: auth.accesstoken }
            })
            showNotification('SUCCESS','update success !')
          /*   getUser(dispatch, currentToken.accesstoken) */
            navigate("/", { replace: true })

            /* setData({...data, err: '' , success: "Updated Success!"}) */
        } catch (err) {
            alert("update fail")
            /* setData({...data, err: err.response.data.msg , success: ''}) */
        }

    }
    
     const styleUpload = {
        display: images ? "block" : "none"
    }
  return <div>
     <div className="flex justify-center pb-3 border-black border-b-[1px]"><h1 className="font-bold text-3xl">Profile</h1></div>
     <div className=" sm:mx-11 md:mx-16">

           <div className="flex justify-center items-center mt-2">
                
                                   <div>

                                    <input type="file" name="file" id="file_up" className="invisible h-0" onChange={handleUpload} />
                                    <label htmlFor="file_up" className="flex justify-center items-center">
                                        <div className="w-[150px] h-[150px]  ">
                                        <img src={avatar ? avatar : auth.user.avatar} alt="" className="w-[100%] h-[100%] rounded-[50%]" />  

                                        </div>
                                    </label>
                                   </div>
                                   {/*  <div id="file_img" style={styleUpload} className="relative w-[200px] h-[200px]">
                                        <img src={images ? images.url : ""} alt="" className="relative w-[100%] h-[100%]" />
                                        <span onClick={handleDelete}  className="absolute  top-[0px] right-[3px] text-2xl cursor-pointer">X</span>
                                    </div> */}
                   
                       
             </div>
              <form className="  my-4 " onSubmit={handleSubmit}>
                           <div className="  justify-items-start  ">

                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                    Name:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="name"
                                                    onChange={handleForm}
                                                    defaultValue={information.name}
                                               />
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                    Email:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="email"
                                                    onChange={handleForm}
                                                    defaultValue={information.email}
                                               />
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                    Password:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="password"
                                                    onChange={handleForm}
                                                    defaultValue={information.password}
                                               />
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  text-black font-semibold lg:text-lg text-base">
                                                    Address:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="address"
                                                    onChange={handleForm}
                                                    defaultValue={information.address}
                                               />
                                          </div>
                                     </div>
                                   
                           </div>
                           <div className="flex mb-3 ">
                                <div className="flex items-center w-2/5  justify-end ">
                                     <label className="text-gray-500 mr-3  "></label>
                                </div>
                                <div className="flex ">
                                     <button  className="py-2 px-4 mt-2 mb-4 round-md font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm" type="submit">
                                          Update
                                     </button>
                                </div>
                           </div>
                      </form>
     </div>
  </div>;
}

