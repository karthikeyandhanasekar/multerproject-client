import { useForm } from "react-hook-form";
import { multiplefile, uploadfile } from "../apiCalls";

import FileComponents from "./FileDisplayComponents";

const Home = () => {
    const { register, handleSubmit } = useForm();

    //upload single file
    const singleupload = async (data) => {
        const formdata = new FormData()
        formdata.append("file", data[0])
        const result = await uploadfile({ filedata: formdata })
        console.log(result);
        result && window.location.reload()
    }

    //upload multiple file
    const multipleupload = async (data) => {
        const formdata = new FormData()
        for (const value of data) {
            formdata.append("file", value)
        }
        const result = await multiplefile({ filedata: formdata })
        result && window.location.reload()

    }



    const onsubmit = async (data) => {
        try {
            data.files.length === 1 ? singleupload(data.files) : multipleupload(data.files)
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <main className="home">
            <div className="titleform">
                <h1>File Upload Using Multer-Gridfs-Storage</h1>
                <h4> Warning : Don't Upload Sensitive Data. Only Pratice Purpose</h4>
                <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data"  >
                    <label className="custom-file-upload">
                        <input {...register("files")} type="file" required multiple />
                        Add Files
                    </label>
                    <br /> <br />
                    <button type="submit" >Upload</button>

                </form>
            </div>
            <FileComponents />
        </main>

    )
}


export default (Home)