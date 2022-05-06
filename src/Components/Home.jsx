import { useForm } from "react-hook-form";
import { downloadfile, uploadfile } from "../apiCalls";



const Home = () => {

    const { register, handleSubmit } = useForm();



    const onsubmit = async (data) => {
        try {
            console.log(data.files);
            const formdata = new FormData()

            formdata.append("file", data.files[0])

            await uploadfile({ filedata: formdata })
        } catch (error) {
            console.error(error.message);
        }
    }
    //filename properties value assign to var value
    const ondonwloadsubmit = async ({ filename: value }) => {
        try {
            const result = await downloadfile({ filename: value })
            console.log(result.data.message.filename);
            console.log(result.config.url);


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
            <div></div>
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