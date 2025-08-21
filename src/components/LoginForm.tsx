import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../App";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    //const {isAuth, setAuthState} = useContext(AuthContext);


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        console.log("Value of Password => ", e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log("Value of Email => ", e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalData = {
            email,
            password
        };
        axios.post("http://localhost:3000/users/login", finalData).then(response => {
            const accessToken = response?.data?.accessToken;
            localStorage.setItem("accessToken", accessToken);
            // setAuthState((prev) => ({
            //     ...prev,
            //     isAuth: true
            // }));
            window.location.href = "/";
        })
        .catch(error => {
            const errors = error?.response?.data?.message || "An error occurred"; 
            alert(errors);
        });
        
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div>
                    <label htmlFor="Email">Email:</label>
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password:</label>
                    <input type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} 
                            className="password-toggle-btn">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginForm;
