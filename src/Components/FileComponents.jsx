import { deletefile, renamefile } from "../apiCalls";



const FileComponent = ({ donwloadurl, filename }) => {


    //delete file   
    const removefile = async (filename) => {
        try {
            const result = await deletefile({ filename: filename })
            result.status && window.location.reload()
        } catch (error) {
            console.error(error.message);
        }
    }

    const rename = async (filename) => {
        try {
            const result = await renamefile({
                oldname: filename,
                newname: prompt("New FileName")

            })
            result.status && window.location.reload()

        } catch (error) {
            console.error(error.message);
        }
    }



    return (
        <div className="file">
            <h5>{filename}</h5>
            <a href={donwloadurl}>Download</a>
            <br />
            <button type="button" className="rename" onClick={() => rename(filename)} >Rename</button>
            <br />
            <button type="button" className="delete" onClick={() => removefile(filename)} >Delete</button>

        </div>
    )
}

export default FileComponent