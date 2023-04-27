import React, { useContext } from 'react';
import './Home.css';
import '../../normal.css';
import threadContext from '../../context/threadContext';


import view_icon from '../../images/view_icon.png';
import delete_icon from '../../images/delete_icon.png';
import { useState, useEffect } from 'react';
import SearchMessage from '../SearchMessage/SearchMessage';
import { useNavigate } from 'react-router-dom';
const Home = () => {




    const [input, setInput] = useState("");
    const [models, setModels] = useState([]);
    const [thread, setThread] = useState({ name: "", threadArray: [] });
    const [currentModel, setCurrentModel] = useState("text-davinci-003");
    const [searchLog, setSearchLog] = useState([{ user: "ai", message: "How can I help you?" }]);
    const [currentThread, setCurrentThread] = useState("");
    const [currentThreadID, setCurrentThreadID] = useState();
    const navigate = useNavigate();
    const context = useContext(threadContext);
    const { addThread, editThread, getThreads, deleteThread, threads } = context;

    var thisThread;
    useEffect(() => {

        if (localStorage.getItem('token')) {

            // console.log(models.length)
            models.length == 0 && getModels();


        }
        else {
            navigate('/login')

        }
    })

    useEffect(() => {





    }, [currentThreadID])

    useEffect(() => {
        currentThreadID && editThread(currentThreadID, searchLog)
        getThreads();

    }, [searchLog])


    var thisThreadID = { id: "" };

    var newSearchLog = searchLog
    var currThread = currentThread
    function clearSearch() {
        setSearchLog([])
        setCurrentThread("")
    }
    const gotologin = () => {
        navigate('/login')
    }
    const handleThreadName = async (e) => {
        e.preventDefault();
        setCurrentThread(thread.name);
        currThread = "";



        thisThread = await addThread(thread.name, thread.threadArray)
        thisThreadID = { id: thisThread._id };
        setCurrentThreadID(thisThread._id)






    }

    async function getModels() {
        try {
            fetch("http://localhost:5000/model/models")
                .then(res => res.json())
                .then(data => {
                    setModels(data.models.data)

                })


        } catch (error) {
            console.log(error)
        }
    }
    //fetch response to the api combining the chat log array of messages and sending it as message to localhost:5000 as a post
    const getResponse = async () => {
        try {
            const messages = newSearchLog.map((message) => message.message).join("\n")
            const response = await fetch("http://localhost:5000/search/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: input, currentModel,

                })

            })
            const data = await response.json()


            setSearchLog([...newSearchLog, { user: "ai", message: `${data.message}` }])
            newSearchLog = [...newSearchLog, { user: "ai", message: `${data.message}` }]



        } catch (error) {
            console.log(error)
        }


    }

    const handleSubmit = (e) => {

        e.preventDefault();
        newSearchLog = [...searchLog, { user: 'me', message: `${input}` }]
        setSearchLog(newSearchLog)




        setInput("");
        getResponse()

        currentThreadID && updateThread()


    }
    const updateThread = async () => {

        await editThread(currentThreadID, newSearchLog)
    }

    return (
        <div className='home'>
            <aside className="sideoptions ">
                <div className="side-options-button" onClick={clearSearch}>
                    + New Chat
                </div>
                <div className=''>
                    <div className="models-text">
                        Models
                    </div>
                    <select onChange={(e) => { setCurrentModel(e.target.value) }} className="models" defaultValue={currentModel}>
                        {
                            models.map((model, index) => (

                                <option key={model.id} value={model.id} > {model.id}</option>
                            ))


                        }
                    </select>

                </div>

                {(!currentThread) && <div>
                    <div className="models-text">
                        Enter thread name
                    </div>

                    <div className='threadname'>
                        <form onSubmit={handleThreadName}>

                            <input onChange={(e) => { setThread({ name: e.target.value, threadArray: newSearchLog }) }} name="" id="" rows="1" className="thread-input-textarea" placeholder='Enter thread name here!!' />
                            <button type='submit' className='threadname-btn' onClick={() => { setCurrentThread(currThread) }}>Submit</button>
                        </form>

                    </div>
                </div>}
                <div className="models-text">
                    Your Threads ({threads.length})
                </div>
                {
                    !threads.error ? threads.map((eachthread, index) => (
                        <div className="showthread" key={index} >
                            <div className="threadname">
                                {eachthread.name}
                            </div>
                            <div className="view-icon">
                                <img src={view_icon} className='view-icon' onClick={() => { setCurrentThread(eachthread.name); setThread({ name: eachthread.name, threadArray: eachthread.threadArray }); thisThreadID = { id: eachthread._id }; setCurrentThreadID(eachthread._id); setCurrentThreadID(eachthread._id); setSearchLog(eachthread.threadArray) }} alt="" />
                            </div>
                            <div className="view-icon">
                                <img src={delete_icon} className='view-icon' onClick={() => { deleteThread(eachthread._id) }} alt="" />
                            </div>


                        </div>
                    )) : gotologin()
                }

            </aside >
            <section className='searchBox'>
                <div className="search-log">
                    {
                        newSearchLog.map((message, index) => (

                            <SearchMessage key={index} message={message} />

                        ))
                    }

                </div>
                <div className="search-input-box">
                    <form onSubmit={handleSubmit}>

                        <input value={input} onChange={(e) => setInput(e.target.value)} name="" id="" rows="1" className="search-input-textarea" placeholder='Ask your query here!!'></input>
                        <button className='btn'>Search</button>
                    </form>
                </div>

            </section>
        </div >
    )
}

export default Home