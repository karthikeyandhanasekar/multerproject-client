
import axios from 'axios'

const baseurl = 'http://localhost:5000'

export const uploadfile = async ({ filedata }) => {
    try {
        return await axios.post(`${baseurl}/upload`, filedata, {
            responseType: "blob",
        })
    } catch (error) {
        console.error(error.message);
    }
}


export const downloadfile = async ({ filename }) => {
    try {
        return await axios.get(`${baseurl}/download/${filename}`)
    } catch (error) {
        console.error(error.message);
    }
}

export const retriveallfiles = async () => {
    try {
        return await axios.get(`${baseurl}/`)
    } catch (error) {
        console.error(error.message);
    }
}