import React from 'react'
import '../Home/Home.css';
import ai_icon from '../../images/ai_icon.png';

const SearchResponse = (message) => {
    return (
        <div>
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
        </div>
    )
}

export default SearchResponse