import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Archive from "./pages/Archive"
import Trash from "./pages/Trash"
import MainLayout from "./layout/MainLayout"
import LabelPage from "./pages/LabelPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="archive" element={<Archive />} />
                    <Route path="trash" element={<Trash />} />
                    <Route path="label/:name" element={<LabelPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App