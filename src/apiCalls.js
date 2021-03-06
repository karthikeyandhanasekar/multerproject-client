
import axios from 'axios'


const baseurl = 'http://localhost:5000'

// api to upload single file
export const uploadfile = async ({ filedata }) => {
    try {
        return await axios.post(`${baseurl}/upload`, filedata, {
            responseType: "blob",
        })
    } catch (error) {
        console.error(error.message);
    }
}

//api to upload multiple file
export const multiplefile = async ({ filedata }) => {
    try {
        return await axios.post(`${baseurl}/multipleupload`, filedata, {
            responseType: "blob",
        })
    } catch (error) {
        console.error(error.message);
    }
}


// api for specific file retrival
export const downloadfile = async ({ filename }) => {
    try {
        return await axios.get(`${baseurl}/download/${filename}`,)
    } catch (error) {
        console.error(error.message);
    }
}

//api for retrive list of file names
export const retrivefilename = async () => {
    try {
        return await axios.get(`${baseurl}/`).then(res => res.data)
    } catch (error) {
        console.error(error.message);
    }
}

//api for delete specific file
export const deletefile = async ({ filename }) => {
    try {
        return await axios.delete(`${baseurl}/delete/${filename}`).then(res => res.data)
    } catch (error) {
        console.error(error.message);
    }
}

//api for rename specific file
export const renamefile = async ({ oldname, newname }) => {
    try {
        return await axios.put(`${baseurl}/rename/${oldname}/${newname}`).then(res => res.data)
    } catch (error) {
        console.error(error.message);
    }
}


