import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Axios from "axios";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                setLoginStatus(true);
            }
        });
    };

    const userAuthenticated = () => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            console.log(response);
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].email)
            }
        });
    }, []);

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <p>Please fill in your login details</p>
            <div className="login-details">
                <h4>Email</h4>
                <input type="email"                     
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required>
                </input>
                <h4>Password</h4>
                <input type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required>
                </input>
            </div><br/><br/>
            <button className="login-button" onClick={login}>Login</button>

            <h4>{loginStatus && <button onClick={userAuthenticated}>Check if Authenticated</button> }</h4>

            <br/><br/>
            <h4>Don't have an account? Register Here!</h4>
            <br/>
            <button className="register-button"><Link to='/register'>Register</Link></button>
        </div>
    )
}