import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem("token", json.authToken)
            localStorage.setItem("name", json.name)
            alert("Logged in Successfully")

            navigate("/home")


        }
        else {
            console.log("invalid credentials", "danger");
            alert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3 login'>
            <div className="login-box">
                <h2 className='m-80'>Login to your Ask Me Anything account</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email address:</label>
                        <div>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                        </div>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <div>
                            <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
                        </div>
                    </div>

                    <button type="submit" className="btn " >Submit</button>
                </form>
                <div className="signuptext">
                    Do not have account?
                    <Link to="/signup" className='signuplink'> Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login