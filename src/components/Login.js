import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title ">Login</div>
            <div className="text">Email or Username</div>
            <input
                type="text"
                placeholder="Email or username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            ></input>
            <div className="input-2">
                <input
                    type={isShowPassword === true ?"text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <i

                    className={isShowPassword ===true? "fa-solid fa-eye-slash" :"fa-solid fa-eye"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
            >
                Login
            </button>
            <div className="back">
                {" "}
                <i class="fa-solid fa-arrow-left"></i> Go back
            </div>
        </div>
    );
};

export default Login;
