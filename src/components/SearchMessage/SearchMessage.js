import React from 'react'
import '../Home/Home.css';
import user_icon from '../../images/user_icon.png';
import ai_icon from '../../images/ai_icon.png';
const SearchMessage = ({ message }) => {
    return (
        <>
            {message.user === "me" && <div>
                <div className="search-message">
                    <div className="search-message-center">
                        <div className="icon">
                            <img src={user_icon} className="icon" alt="user_icon" />
                        </div>
                        <div className="message">

                            {message.message}
                        </div>
                    </div>
                </div>
            </div>
            }
            {message.user === "ai" && <div>
                <div className="search-message-response">
                    <div className="search-message-center">
                        <div className="icon-response">
                            <img src={ai_icon} alt="" className="icon-response" />
                        </div>
                        <div className="message">
                            {message.message}
                        </div>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default SearchMessage