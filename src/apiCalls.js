
import axios from 'axios'

const baseurl = 'http://localhost:5000'

export const uploadfile = async ({ filedata }) => {
    try {
        return await axios.post(`${baseurl}/upload`, filedata)
    } catch (error) {
        console.error(error.message);
    }
}