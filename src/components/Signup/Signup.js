import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem("token", json.authToken)
            setCredentials({ name: "", email: "", password: "", cpassword: "" })
            alert("Account created successfully")

            console.log("Account created successfully", "success");
            navigate("/login");
        }
        else {
            console.log("Invalid Credentials", "danger");
            alert("Invalid Credentials");
        }
        console.log(json)

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="signup mt-3">
            <div className='signup-box'>
                <h2 className='m-80'>Create an account to use Ask Me Anything</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:          </label>
                        <div>
                            <input type="text" value={credentials.name} className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address:  </label>
                        <div>
                            <input type="email" value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:    </label>
                        <div>
                            <input type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password:</label>
                        <div>
                            <input type="password" value={credentials.cpassword} className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                        </div>
                        <div className="check">
                            {credentials.password !== credentials.cpassword ?
                                "Password and confirm password does not match" : <span className='checkpass'>Password and confirm password matched</span>}
                        </div>
                    </div>

                    <button disabled={credentials.cpassword !== credentials.password} type="submit" className="btn ">Submit</button>
                </form>
                <div className="logintext">
                    Already have account?
                    <Link className='loginlink' to='/login'> Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup