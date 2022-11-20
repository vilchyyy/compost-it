import Pusher from "pusher-js"
import axios from "axios"
import { useState, useEffect, useRef } from "react"


export default function Chat({username}){
    
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState("")
    
    const bottomRef = useRef(null);

    useEffect(() =>{
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: "eu",
            authEndpoint: "api/pusher/auth",
            auth: {params: {username}}
        })
        const channel = pusher.subscribe("presence-channel");
        console.log("chuj")
        channel.bind("chat-update", (data) => {
            const {message, username, time} = data
            setChats((prevstate) => [
                ...prevstate,
                {username, message, time}
            ])
        })

        return (() => {
            pusher.unsubscribe("presence-channel")
        })

    },[])
    useEffect(() =>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        console.log(bottomRef)
    }, [chats])
    const handleSubmit = async(e) => {
        e.preventDefault()
        let date = new Date()
        let hour = date.getHours()>9?date.getHours().toString():"0"+date.getHours().toString()
        let minute = date.getMinutes()>9?date.getMinutes().toString():"0"+date.getMinutes().toString()
        let time = hour+":"+minute
        await axios.post("/api/pusher", {
            message, 
            username,
            time
        })
        setMessage("")
    }

    return (
    <div className="relative flex-col w-8/12">
        <div  className="bg-white w-full border-2 border-gray-800 rounded-lg h-80 overflow-x-hidden overflow-y-auto">
            {chats.map((chat, id) => {
                if(username === chat.username){
                return (<div className={" mx-2 flex justify-end items-baseline "} key={id}>
                    <span  className="text-xs">{chat.time}</span>
                    <span className="bg-green-600 w-6/12 text-sm break-all rounded-lg p-2 m-2">{chat.username}: {chat.message}</span>
                </div>)
                }else{
                    return (<div className={"mx-2 flex justify-start items-baseline"} key={id}>
                    <span className="bg-blue-800 w-6/12 text-sm break-all rounded-lg p-2 m-2">{chat.username}: {chat.message}</span>
                    <span className="text-xs">{chat.time}</span>
                </div>)
                }
            })}
            <div ref={bottomRef} />
        </div>
        <form  className="h-4 flex items-center justify-center" onSubmit={handleSubmit}>
            <input  className="absolute w-full  border-2 border-gray-800 rounded-md " type="text" value = {message} onChange={e=> setMessage(e.target.value)} placeholder="Write a message"></input>
        </form>
        
    </div>
        
    )
}