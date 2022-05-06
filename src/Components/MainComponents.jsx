import { Route, Routes } from "react-router-dom"
import Home from "./Home"



const MainComponents = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
        </Routes>
    )
}


export default MainComponents