import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
function App() {
    return (
        <>
            <div className="app-container">
                <Header></Header>
                <Container>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/users" element={<TableUsers/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
                </Container>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            ></ToastContainer>
        </>
    );
}

export default App;
