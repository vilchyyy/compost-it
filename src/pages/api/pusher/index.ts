import { pusher } from "../../../../lib/index";

export default async function handler(req, res){
    const { message, username, time} = req.body;
    
    await pusher.trigger("presence-channel", "chat-update", {
        message,
        username,
        time
    })
    res.json({status: 200})
}