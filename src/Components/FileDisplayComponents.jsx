import React, { useEffect, useState } from "react"
import { downloadfile, retrivefilename } from "../apiCalls"
import FileComponent from "./FileComponents";



const FileComponents = () => {
    const [files, getfiles] = useState([])

    useEffect(() => {
        retrivefilecontent()

    }, []);


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
    //Map Construct key value pair since key is unique , array of objects has been distinct
    const uniquefiles = [
        ...new Map(files?.map((file) => [file["filename"], file])).values(),
    ];
    return (
        <div className="files">
            {

                files[0] && React.Children.toArray(uniquefiles.map(ele =>
                    <FileComponent donwloadurl={ele.downloadurl} filename={ele.filename} />
                ))
            }
        </div>
    )
}


export default FileComponents