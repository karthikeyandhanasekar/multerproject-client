import { useForm } from "react-hook-form";
import { downloadfile, retrivefilename, uploadfile } from "../apiCalls";
import React, { useEffect, useState } from 'react';



const Home = () => {
    const { register, handleSubmit } = useForm();
    const [filename, getfilename] = useState([])


    const retrivefilecontent = async () => {

        const names = await retrivefilename()
        let filelist = []
        names.map((filename) => {
            downloadfile({ filename: filename }).then(result => {
                const [contenttype, charaset] = result.headers['content-type'].split(";")
                const filedata = {
                    filename: result.data.filename,
                    contenttype: contenttype,
                    charaset: charaset,
                    downloadurl: result.config.url
                }
                filelist.push(filedata);
                getfilename(data => [...data, filedata])
            })


        })


    }
    useEffect(() => {
        retrivefilecontent()
    }, []);

    const onsubmit = async (data) => {
        try {
            const formdata = new FormData()

            formdata.append("file", data.files[0])

            await uploadfile({ filedata: formdata })
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

                    <input {...register("files")} type="file" required />

                    <br /> <br />
                    <button type="submit" >Upload</button>

                </form>
            </div>
            <div>
                {
                    // filename[0] && React.Children.toArray(filename.map(ele => <span className="file">{ele}</span>))

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


export default Home