import Pusher from "pusher-js"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Chat({username}){
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: "eu",
        authEndpoint: "api/pusher/auth",
        auth: {params: {username}}
    })

    const [chats, setChats] = useState([])
    const [message, setMessage] = useState("")
    
    useEffect(() =>{
        const channel = pusher.subscribe("presence-channel");

        channel.bind("chat-update", (data) => {
            const {message, username} = data
            setChats((prevstate) => [
                ...prevstate,
                {username, message}
            ])
        })

        return (() => {
            channel.unsubscribe("presence-channel")
        })

    },[])
    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post("/api/pusher", {
            message, 
            username
        })
    }

    return (
        <div>
            Hi {username}
            {chats.map((chat, id) => {
                return (<div key={id}>
                    {chat.message}
                </div>)
            })}
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e=> setMessage(e.target.value)} placeholder="aaaa"></input>
            </form>
           
        </div>
    )
}