import Pusher from "pusher-js"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Chat({username}){
    
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState("")
    
    useEffect(() =>{
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: "eu",
            authEndpoint: "api/pusher/auth",
            auth: {params: {username}}
        })
        const channel = pusher.subscribe("presence-channel");
        console.log("chuj")
        channel.bind("chat-update", (data) => {
            const {message, username} = data
            setChats((prevstate) => [
                ...prevstate,
                {username, message}
            ])
        })

        return (() => {
            pusher.unsubscribe("presence-channel")
        })

    },[])
    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post("/api/pusher", {
            message, 
            username
        })
        setMessage("")
    }

    return (
    <div className="relative w-8/12">
        <div className="bg-white w-full border-4 border-gray-800 rounded-md h-80 overflow-scroll">
            {chats.map((chat, id) => {
                if(username === chat.username){
                return (<div className={" mx-2 flex justify-end items-baseline "} key={id}>
                    <span className="text-sm">Time</span>
                    <span className="bg-green-600 w-6/12 text-sm break-all rounded-lg p-2 m-2">{chat.username}: {chat.message}</span>
                </div>)
                }else{
                    return (<div className={"mx-2 flex justify-start items-baseline"} key={id}>
                    <span className="bg-blue-800 w-6/12 text-sm break-all rounded-lg p-2 m-2">{chat.username}: {chat.message}</span>
                    <span className="text-sm">Time</span>
                </div>)
                }
            })}
            
        </div>
        <form onSubmit={handleSubmit}>
        <input  className="absolute bottom-0 border-4 w-full " type="text" value ={message} onChange={e=> setMessage(e.target.value)} placeholder="Write a message"></input>
        </form>
        
    </div>
        
    )
}