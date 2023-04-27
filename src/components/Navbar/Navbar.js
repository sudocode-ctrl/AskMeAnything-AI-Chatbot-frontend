import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import user_icon from '../../images/user.png';
import ama_icon from '../../images/ama_icon.png';

const Navbar = () => {
    const location = useLocation;
    let navigate = useNavigate();
    useEffect(() => {
        if (location.pathname !== "/home") {
            localStorage.removeItem("token");
            localStorage.removeItem("name");

        }
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        alert("Logged out Successfully")

    }


    return (
        <div >
            <div className="container">
                <div className="wrapper">
                    <div className="left">
                        <ul className="title-list">
                            <li className="listItem">
                                <div className="ama-icon">
                                    <img src={ama_icon} className="icon" alt="title_icon" />
                                </div>
                            </li>
                            <li className="listItem">
                                <Link to="/" className="title">
                                    Ask Me Anything
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="">
                        <ul className="list">
                            <li className="listItem">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="listItem">
                                <Link to="/about">About</Link>
                            </li>


                        </ul>
                    </div>


                    <div className="logout">
                        {(!localStorage.getItem("token")) && location.pathname !== '/home' ?
                            (<form className="" role="search">

                                <Link className="btn  mx-2" to="/" role="button">Login</Link>
                                <Link className="btn  mx-2" to="/signup" role="button">Sign Up</Link>
                            </form>) : <> <button onClick={handleLogout} className='btn '>Logout</button> <span className="usericon"><img className="usericon" src={user_icon} alt="user icon" /></span> <span>  {localStorage.getItem("name")}</span></>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
