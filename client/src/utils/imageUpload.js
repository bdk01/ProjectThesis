import axios from '../axios'



export const imageUpload = async (files,auth) => {
    if (!files) return alert("file is not exist!");
      if (files.size > 1024 * 1024) return alert("Size is too large");
      if (files.type !== "image/jpeg" && files.type !== "image/png")  return alert("File is not the image");
      let formData = new FormData();
      formData.append("file", files);
       const res = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: auth.accesstoken,
      }, });
    return res

}


