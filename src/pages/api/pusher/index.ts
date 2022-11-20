import { pusher } from "../../../../lib/index";

export default async function handler(req, res){
    const {type, message, receiver, sender, time} = req.body;
    
    if (type === "public") {
        await pusher.trigger("presence-channel", "chat-update", {
            message,
            sender,
            time
        })
    }else if(type === "private") {
        const channels = ["private-"+receiver, "private-"+sender]
        await pusher.trigger(channels, "private-chat-init", {
            channelName: channels.sort().join("_"),
            init_by: sender,
            receiver: receiver
        })
        if(message){
            await pusher.trigger(channels.sort().join("_"), "chat-update", {
                message,
                sender,
                time
            })
        }
    }

    

    

    res.json({status: 200})
}