import { useForm } from "react-hook-form";
import { uploadfile } from "../apiCalls";



const Home = () => {

    const { register, handleSubmit } = useForm();



    const onsubmit = async (data) => {
        try {
            console.log(data.files);
            const formdata = new FormData()

            formdata.append("file", data.files[0])

            const result = await uploadfile({ filedata: formdata })
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <main className="home">
            <h1>Multer Project </h1>
            <br /><br />
            <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data"  >

                <input {...register("files")} type="file" multiple />

                <br /> <br />
                <button type="submit" >Upload</button>

            </form>

        </main>

    )
}


export default Home