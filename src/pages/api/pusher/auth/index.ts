import { pusher } from "../../../../../lib"

export default async function handler(req, res){

    const {socket_id, channel_name, username} = req.body

    const randomString = Math.random().toString(36).slice(2);

    const presenceData = {
        user_id: randomString,
        user_info: {
            username
        }
    }
    try{
        const auth = pusher.authenticate(socket_id, channel_name, presenceData)
        console.log(auth)
        res.send(auth)
    }catch (err){
        console.error(err)
    }

}