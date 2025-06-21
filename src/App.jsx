import './css/App.scss'
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import ThemeLayout from "./layouts/ThemeLayout.jsx";

function App() {

    return (
        <>
            <ThemeProvider>
                <ThemeLayout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </ThemeLayout>
            </ThemeProvider>
        </>
    )
}

export default App
