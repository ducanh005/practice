import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
    const user = useSelector(state=>state.user.account)

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>You don't have permission to access this route</p>
                </Alert>
            </>
        );
    }

    return (
        <>
           {props.children}
        </>
    );
};

export default PrivateRoute;
