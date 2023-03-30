import connectDB from "../../../libs/utils/connectDB";
import Rooms from '../../../libs/models/Room';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Users from "../../../libs/models/Users";

export default connectDB(async function list(req, res){

    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        // Signed in
        // console.log("Session", JSON.stringify(session, null, 2))
        // console.log("Email", session.user.email)
        const user = await Users.findOne({email: session.user.email})
        // const newRoom = new Rooms({
        //     createdBy: user._id
        // })
        // await newRoom.save()
        const rooms = await Rooms.find({createdBy: user._id})

        res.status(200).json({message: 'success', rooms: rooms})
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
    
})