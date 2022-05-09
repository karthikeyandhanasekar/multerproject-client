import { useForm } from "react-hook-form";
import { downloadfile, multiplefile, retrivefilename, uploadfile } from "../apiCalls";
import React, { useEffect, useState } from 'react';


const Home = () => {
    const { register, handleSubmit } = useForm();
    const [files, getfiles] = useState([])

    const retrivefilecontent = async () => {

        // get the list of file name from db
        const names = await retrivefilename()

        // iterate the filename and get content & details
        for (const filename of names) {
            downloadfile({ filename: filename }).then(result => {
                const [contenttype, charaset] = result.headers['content-type'].split(";")
                const filedata = {
                    filename: result.config.url.split("/").pop(),
                    contenttype: contenttype,
                    charaset: charaset,
                    downloadurl: result.config.url,
                }
                getfiles(data => [...data, filedata])
            })
        }
    }


    useEffect(() => {
        retrivefilecontent()

    }, []);

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
            {

                files[0] && React.Children.toArray(files.map(ele => {
                    if (ele.contenttype?.startsWith("image/")) {
                        return (
                            <div className="image">
                                <img src={ele.downloadurl} alt={ele.filename} loading="lazy" />
                            </div>
                        )
                    }
                    else {
                        return (
                            <a className="file" href={ele.downloadurl} download>{ele.filename}</a>
                        )
                    }
                }))


            }
        </main>

    )
}


export default (Home)