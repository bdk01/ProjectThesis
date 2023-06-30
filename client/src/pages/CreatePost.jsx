import React, { useState } from "react";
import axios from '../axios'
import photo from '../assets/img/addphoto.png'
import { useSelector } from "react-redux";

export default function CreatePost() {
      const [images, setImages] = useState(false)
       const { auth} = useSelector(state => state)
          const [information, setInformation] = useState({
          location:"",
          description:"",
           meetingName:"",
           price:""
     });
       const handleUpload = async (e) => {
          console.log('fgf')
        e.preventDefault()
        try {
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
            setImages(res.data)
        }
        catch (err) {
            alert(err.respone.data.msg)
        }
    }
       const handleDelete = async (e) => {

        e.preventDefault()
        try {
         /*    if (user.role !== 1) return alert("you are not admin") */
           console.log( images.public_id)
            await axios.post("/api/destroy-upload", { public_id: images.public_id }, {
                headers: { Authorization: auth.accesstoken }
            })
             setImages(false)
        }
        catch (err) {
            alert(err.respone.data.msg)
        }

    }
     
       const handleForm = async (e) => {

        e.preventDefault()
        try {
 
        }
        catch (err) {
            alert(err.respone.data.msg)
        }

    }
       const handleSubmit = async (e) => {

        e.preventDefault()
        try {
 
        }
        catch (err) {
            alert(err.respone.data.msg)
        }

    }

     const styleUpload = {
        display: images ? "block" : "none"
    }
  return <div>
     <div className="flex justify-center pb-3 border-black border-b-[1px]"><h1 className="font-bold text-3xl">Post Ad</h1></div>
     <div className=" mx-9">

           <div className="create_detail-img-note">
                  <h2 className="font-semibold text-2xl">Add photos</h2>
                    <div className="w-[180px]">
                                    <input type="file" name="file" id="file_up" className="invisible h-0" onChange={handleUpload} />
                                    <label htmlFor="file_up" className="input-label">
                                    {
                                        images ?  <div></div>
                                        :<div className="clickphoto"> <i className="fa-solid fa-image"></i>
                                        <img src={photo} alt="" className="w-[150px] h-[150px]" />
                                        </div>
                                    }      
                                    </label>
                                    <div id="file_img" style={styleUpload} className="relative w-[200px] h-[200px]">
                                        <img src={images ? images.url : ""} alt="" className="relative w-[100%] h-[100%]" />
                                        <span onClick={handleDelete}  className="absolute  top-[0px] right-[3px] text-2xl cursor-pointer">X</span>
                                    </div>
                      </div>  
             </div>
              <form className="  my-4 " onSubmit={handleSubmit}>
                           <div className="  justify-items-start  ">

                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                    MeetingName:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
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
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="description"
                                                    onChange={handleForm}
                                                    defaultValue={information.description}
                                               />
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  font-semibold  lg:text-lg text-base">
                                                    Price:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="price"
                                                    onChange={handleForm}
                                                    defaultValue={information.price}
                                               />
                                          </div>
                                     </div>
                                     <div className="flex mb-6 sm:py-1 flex-row  w-[100%]">
                                          <div className="flex items-center   justify-start w-[140px]">
                                               <label className=" mr-3  text-black font-semibold lg:text-lg text-base">
                                                    Location:
                                               </label>
                                          </div>
                                          <div className="flex  w-[80%]">
                                               <input
                                                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-black text-base  w-[100%]  line-clamp-1"
                                                    type="text"
                                                    name="location"
                                                    onChange={handleForm}
                                                    defaultValue={information.location}
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
                                          Post
                                     </button>
                                </div>
                           </div>
                      </form>
     </div>
  </div>;
}
