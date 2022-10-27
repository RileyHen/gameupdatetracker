import React, {useState} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export default function Register() {
    
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            email: emailReg,
            password: passwordReg
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="register-container">
            <h2>Register Page</h2>
            <p>Please fill in your details</p>
            <div className="register-details">
                <h4>Email</h4>
                <input type="email" 
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}>
                </input>
                <h4>Password</h4>
                <input type="password" 
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}>
                </input>
            </div><br/><br/>
            <button className="register-button" onClick={register}>Register</button>
            <br/><br/>
            <h4>Already have an account? Login Here!</h4>
            <br/>
            <button className="login-button"><Link to='/login'>Login</Link></button>
        </div>
    )
}