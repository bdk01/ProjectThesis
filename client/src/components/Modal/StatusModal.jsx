import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CloseStatus } from '../../redux/statusSlice'
import axios from '../../axios'
import { BsCardImage } from "react-icons/bs";
import { createForumPost, createPost, editPost } from '../../api/postAPI';
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from '../../redux/postSlice';
import { imageUpload } from '../../utils/imageUpload';
import { useTranslation } from 'react-i18next';
const StatusModal = () => {
  const { auth, status, socket } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const { t } = useTranslation();
  const [stream, setStream] = useState(false)
  const [forum, setForum] = useState(false)
  const videoRef = useRef()
  const refCanvas = useRef()
  const [tracks, setTracks] = useState('')
  const { id } = useParams()

  const handleChangeImages = async (e) => {
    /*    const files =e.target.files[0];
       if (!files) return alert("file is not exist!");
       if (files.size > 1024 * 1024) return alert("Size is too large");
       if (files.type !== "image/jpeg" && files.type !== "image/png")  return alert("File is not the image");
       let formData = new FormData();
       formData.append("file", files);
       const res = await axios.post("/api/upload", formData, {
       headers: {
         "Content-Type": "multipart/form-data",
         Authorization: auth.accesstoken,
       },
     }); */
    const res = await imageUpload(e.target.files[0], auth)
    console.log(res.data)
    setImages([...images, { ...res.data }]);
  }

  const deleteImages = async (index, public_id) => {
    console.log(public_id);
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
    await axios.post("/api/destroy-upload", { public_id: public_id }, {
      headers: { Authorization: auth.accesstoken }
    })
  }

  const handleStream = () => {
    setStream(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()

          const track = mediaStream.getTracks()
          setTracks(track[0])
        }).catch(err => console.log(err))
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width)
    refCanvas.current.setAttribute("height", height)

    const ctx = refCanvas.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = refCanvas.current.toDataURL()
    setImages([...images, { camera: URL }])

  }
  useEffect(() => {

    if (id) {
      setForum(true)
    }

  }, [])
  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (images.length === 0) return alert("Please add your photo");

    /*  return dispatch({ 
         type: GLOBALTYPES.ALERT, payload: {error: "Please add your photo."}
     }) */

    if (status.onEdit) {

      /*   updatePost({content, images, auth, status,dispatch}) */
      await editPost({ content, images, auth, status, dispatch })
    } else {
      /*      createPost({content, images, auth, socket,dispatch}) */
      if (forum) {

        await createForumPost({ images: images, content: content, auth: auth, socket, dispatch, forumId: id })
      }
      else {

        await createPost({ images: images, content: content, auth: auth, socket, dispatch })
      }

    }

    setContent('')
    setImages([])
    dispatch(CloseStatus({ status: false }))
  /*   navigate('/home') */


  }

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.post.content)
      setImages(status.post.images)
    }
  }, [status])

  return (
    <div className="z-50 fixed flex justify-center items-center w-[100vw] h-[100vh] bg-[#0008]">
      <form
        onSubmit={handleSubmit}
        className="min-w-[500px] width-[100%] bg-white mt-[30px] p-[20px] rounded-md"
      >
        <div className="flex items-center justify-between border-b-[1px] border-gray-400 pb-2 mb-1">

          {status.onEdit ? <h2 className="font-semibold text-2xl">Edit Post</h2> : <h2 className="font-semibold text-2xl">    {t('Create Post')}</h2>}
          <span
            onClick={() => dispatch(CloseStatus({ status: false }))}
            className="font-bold text-3xl cursor-pointer"
          >
            &times;
          </span>
        </div>

        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={t('what are you thinking?')}
            onChange={(e) => setContent(e.target.value)}
            className="w-[95%] h-[150px] mb-1"
          />

          {/*    <div className="flex justify-center items-center"> */}
          {/*  <div className="flex-fill"></div> */}
          {/*     <Icons setContent={setContent} content={content} theme={theme} /> */}

          {/*     </div> */}

          <div className="flex ">
            {images?.map((img, index) => (
              <div id="file_img" className='mx-2' key={index} >
                {/*   <img src={img.url} alt='' className='w-[50px] h-[50px]' /> */}
                <div className="relative w-[85px] h-[85px]">
                  <img src={img.url} alt="" className="relative w-[100%] h-[100%]" />
                  <span onClick={() => deleteImages(index, img.public_id)} className="absolute  top-[-7px] right-[1px] text-2xl cursor-pointer">&times;</span>
                </div>


              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"

              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                {/*   <i className="fas fa-camera" onClick={handleStream} /> */}

                <div className="flex justify-center items-center">
                  <input
                    className='hidden'
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    /*    accept="image/*,video/*" */
                    onChange={handleChangeImages}
                  />
                  <label htmlFor="file" className="input-label">
                    <BsCardImage className="w-[50px] h-[50px]" />

                  </label>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex mb-3 justify-center">
          {status.onEdit ?
            <button
              className="py-2 px-4 mt-2 mb-2 round-md w-[80%] font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm"
              type="submit"
            >
              {t('submit')}
            </button>
            : <button
              className="py-2 px-4 mt-2 mb-2 round-md w-[80%] font-medium bg-red-600  hover:translate-y-[-1px] transition-all text-white rounded-sm"
              type="submit"
            >
              {t('submit')}
            </button>
          }
        </div>
      </form>
    </div>
  );
}

export default StatusModal
