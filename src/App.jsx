import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./screens/Signin";
import SignUp from "./screens/Signup";
import Game from "./screens/Game"; // importing Game.jsx

function App() {
    return (
        <BrowserRouter>
            <div className="App"> 
                <Routes>
                    <Route exact path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/chat-home/:receiverId" element={<Game />} />
                    
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
