import { useForm } from "react-hook-form";
import { downloadfile, multiplefile, retrivefilename, uploadfile } from "../apiCalls";
import React, { memo, useEffect, useState } from 'react';



const Home = () => {
    const { register, handleSubmit } = useForm();
    const [files, getfiles] = useState([])


    const retrivefilecontent = async () => {

        const names = await retrivefilename()
        console.log(names);
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

    const singleupload = async (data) => {
        const formdata = new FormData()
        console.log("singlefile");
        formdata.append("file", data[0])
        const result = await uploadfile({ filedata: formdata })
        console.log(result);
        result && window.location.reload()
    }

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
            console.log("onclick");
            data.files.length === 1 ? singleupload(data.files) : multipleupload(data.files)
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <main className="home">
            <div>
                <h1>File Upload Using Multer-Gridfs-Storage</h1>
                <h4> Warning : Don't Upload Sensitive Data. Only Pratice Purpose</h4>
                <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data"  >

                    <input {...register("files")} type="file" required multiple />

                    <br /> <br />
                    <button type="submit" >Upload</button>

                </form>
            </div>
            <div className="filelist">
                {
                    files[0] && React.Children.toArray(files.map(ele => {
                        if (ele.contenttype.startsWith("image/")) {
                            return (
                                <img src={ele.downloadurl} alt={ele.filename} />
                            )
                        }
                        else {
                            return (<a href={ele.downloadurl} className="file">{ele.filename}</a>)
                        }
                    }))

                }

            </div>
            <br /><br />

            <br /> <br />
            {/* 
            <form onSubmit={handleSubmit(ondonwloadsubmit)} encType="multipart/form-data"  >

                <input {...register("filename")} type="text" multiple />

                <br /> <br />
                <button type="submit" >Download</button>

            </form> */}

        </main>

    )
}


export default (Home)