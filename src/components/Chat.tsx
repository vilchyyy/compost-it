import React from "react"
import Pusher from "pusher-js"
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { pusher } from "../../lib"

interface data {
    message: string,
    username: string,
    time: string
}
interface props {
    username: string
}

export default function Chat({ username }:props){
    
    const [chats, setChats] = useState<data[]>([])
    const [message, setMessage] = useState("")
    const [chatOpen, setChatOpen] = useState(false)
    const [receiver, setReceiver] = useState<string>("")

    const bottomRef = useRef<any>(null);

    var privateChats = {};

    useEffect(() =>{
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
            cluster: "eu",
            authEndpoint: "api/pusher/auth",
            auth: {params: {username}}
        })
        const priv = pusher.subscribe("private-" + username);
        priv.bind("private-chat-init", (data) => {
            if (data.init_by === username ){
                privateChats[ data.receiver ] = pusher.subscribe( data.channelName );
                console.log(privateChats[ data.receiver ])
                privateChats[data.receiver].bind("chat-update", (data) => {
                    const {message, username, time} = data
                    console.log(data)
                })
            }else if(data.receiver === username) {
                privateChats[ data.init_by ] = pusher.subscribe( data.channelName );
                console.log(privateChats[ data.init_by ])
                privateChats[data.init_by].bind("chat-update", (data) => {
                    const {message, username, time} = data
                    console.log(data)
                })
            }
        })
        const channel = pusher.subscribe("presence-channel")
        channel.bind("chat-update", (data: data) => {
            const {message, username, time} = data
            setChats((prevstate: data[]) => [
                ...prevstate,
                {username, message, time}
            ])
        })

        return (() => {
            pusher.unsubscribe("presence-channel")
            pusher.unsubscribe("private-" + username)
            
        })

    },[])
    useEffect(() =>{
        bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
    }, [chats])
    const handleSubmitForInit = async(e: any) => {
        e.preventDefault()
        const date = new Date()
        const hour = date.getHours()>9?date.getHours().toString():"0"+date.getHours().toString()
        const minute = date.getMinutes()>9?date.getMinutes().toString():"0"+date.getMinutes().toString()
        const time = hour+":"+minute

        await axios.post("/api/pusher", {
            type: "private",
            message,
            receiver: receiver,
            sender: username,
            time
        })
        setMessage("")
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const date = new Date()
        const hour = date.getHours()>9?date.getHours().toString():"0"+date.getHours().toString()
        const minute = date.getMinutes()>9?date.getMinutes().toString():"0"+date.getMinutes().toString()
        const time = hour+":"+minute
        if(Object.keys(privateChats).length > 0){
            pusher.trigger(privateChats[receiver], "chat-update", {
                message,
                username,
                time
            })
        }
        
    }

    return (
    <div className="bg-white relative border-2 border-gray-800 rounded-xl flex-col w-full">
        <input type="text" onChange={(e)=>{setReceiver(e.target.value)}} />
        <div className="bg-green-500 w-full h-5 rounded-md flex items-center justify-end">
            <button onClick={() => setChatOpen(!chatOpen)} className="border-2 border-gray-900 rounded-md h-5 w-5 text-md tracking-tighter leading-none text-top pb-4 font-bold ">{chatOpen ? "X" : "^"}</button>
        </div>
        <motion.div animate={chatOpen ? {height: "20rem", opacity:1}:{height: 0, opacity: 0}}  className=" w-full   overflow-x-hidden overflow-y-auto">
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
        </motion.div>
        {(chatOpen && <form  className="h-4 mt-2 flex items-center justify-center" onSubmit={handleSubmit}>
            <input  className="absolute w-full  border-2 border-gray-800 rounded-lg " type="text" value = {message} onChange={e=> setMessage(e.target.value)} placeholder="Write a message"></input>
        </form>)}
        
    </div>
        
    )
}