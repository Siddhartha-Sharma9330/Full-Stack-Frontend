import axios from "axios";
import { useState } from "react";

function RegisterForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        console.log("Value of Name => ", e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        console.log("Value of Password => ", e.target.value);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        console.log("Value of Email => ", e.target.value);
    }
    const handleSubmit=  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalData ={
            name, email, password
        };
        axios.post("http://localhost:3000/users/create", finalData).then(response => {
            alert("User Registered Successfully");
        })
        .catch(error => {
            const errors = error?.response?.data?.errors || "An error occurred"; 
            alert(errors);
        });
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Register Form</h1>

            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" 
                placeholder="Name" 
                value={name}
                onChange= {handleNameChange}
                 />
            </div>
            <div>
                <label htmlFor="Email">Email:</label>
                <input type="email" 
                placeholder="Email" 
                value={email}
                onChange= {handleEmailChange}
                 />
            </div>
            <div className="password-container">
                <label htmlFor="password">Password:</label>
                <input type={showPassword ? "text" : "password"}
                    placeholder="Password" 
                    value={password}
                    onChange= {handlePasswordChange}
                 />
                <button type="button" onClick={() => setShowPassword(!showPassword)} 
                        className="password-toggle-btn">
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
            </div>
            <button type="submit">Register</button>
            </form>
        </>

    );
}

export default RegisterForm;
