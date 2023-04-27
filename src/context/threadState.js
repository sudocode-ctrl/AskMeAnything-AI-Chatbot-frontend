
import ThreadContext from "./threadContext";
import { useState } from "react";
const ThreadState = (props) => {
    const host = "http://localhost:5000"
    const threadsInitial = []
    const [threads, setThreads] = useState(threadsInitial);
    const [curThread, setCurThread] = useState(threadsInitial);

    //   Add thread 
    const addThread = async (name, threadArray) => {
        //API call
        try {
            const response = await fetch(`${host}/threads/addthread`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ name, threadArray }), // body data type must match "Content-Type" header
            });

            const thread = await response.json();

            setThreads(threads.concat(thread))
            setCurThread(thread)
            return thread

        } catch (error) {
            console.log(error)
        }

    }


    //   Fetch all threads 
    const getThreads = async () => {
        //API call

        try {
            const response = await fetch(`${host}/threads/fetchallthreads`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            const json = await response.json()

            setThreads(json);
            return json;


        } catch (error) {
            console.log(error)
        }
    }

    // Delete thread
    const deleteThread = async (id) => {
        try {
            const response = await fetch(`${host}/threads/deletethread/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

            });
            const json = await response.json();
            console.log(json)
            console.log("Deleteing thread with id:" + id);
            const newThreads = threads.filter((thread) => { return thread._id !== id })
            setThreads(newThreads);

        } catch (error) {
            console.log(error)
        }

    }

    // edit thread 
    const editThread = async (id, threadArray) => {

        //API call

        try {
            const response = await fetch(`${host}/threads/updatethread/${id}`, {

                method: "PUT", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ threadArray }), // body data type must match "Content-Type" header
            });
            const json = await response.json();


            let newThreads = JSON.parse(JSON.stringify(threads))

            // logic to fetch in client
            for (let index = 0; index < newThreads.length; index++) {
                const element = newThreads[index];
                if (element._id === id) {
                    newThreads[index].threadArray = threadArray;

                    break;
                }


            }
            setThreads(newThreads)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ThreadContext.Provider value={{ threads, curThread, setCurThread, addThread, deleteThread, editThread, getThreads }}>
            {props.children}

        </ThreadContext.Provider>
    )
}

export default ThreadState;