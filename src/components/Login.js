import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);

    const isLoading = useSelector((state) => state.user.isLoading);
    const account = useSelector((state) => state.user.account);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or Password is equired!");
            return;
        }
        dispatch(handleLoginRedux(email, password));
    };

    const handleGoBack = () => {
        navigate("/");
    };

    const handlePressEnter = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/");
        }
    }, [account]);
    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title ">Login</div>
            <div className="text">Email or Username (eve.holt@reqres.in)</div>
            <input
                type="text"
                placeholder="Email or username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            ></input>
            <div className="input-2">
                <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                ></input>
                <i
                    className={
                        isShowPassword === true
                            ? "fa-solid fa-eye-slash"
                            : "fa-solid fa-eye"
                    }
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}{" "}
                &nbsp;Login
            </button>
            <div className="back">
                {" "}
                <i className="fa-solid fa-arrow-left"></i>
                <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
            </div>
        </div>
    );
};

export default Login;
