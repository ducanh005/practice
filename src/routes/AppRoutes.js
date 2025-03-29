import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import TableUsers from "../components/TableUsers";
import NotFound from "./NotFound";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>

                <Route path="/login" element={<Login />}></Route>
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            {" "}
                            <TableUsers></TableUsers>
                        </PrivateRoute>
                    }
                ></Route>

                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
