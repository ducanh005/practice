import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";

import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const { user, loginContext } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            loginContext(
                localStorage.getItem("email"),
                localStorage.getItem("token")
            );
        }
    }, []);
    return (
        <>
            <div className="app-container">
                <Header></Header>
                <Container>
                    <AppRoutes></AppRoutes>
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
