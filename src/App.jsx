import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./screens/Signin";
import SignUp from "./screens/Signup";
import Game from "./screens/Game"; // Importing Game.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are included

function App() {
    return (
        <BrowserRouter>
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                closeOnClick 
                theme="dark" 
            />
            <Routes>
                <Route exact path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/chat-home/:receiverId" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
