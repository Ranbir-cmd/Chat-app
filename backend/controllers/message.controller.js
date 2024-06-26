import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;  // this user himself 

        // finding if these two user has conversation already. if not, then create a new conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        }); // find a conversation where participants array contains all the elements
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        // this is how creating a new conversation with message data
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // this will take some time. will run one by one
        // await conversation.save();
        // await newMessage.save();

        // but this will run in parallel 
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET FUNCTIONALITY 
        // --- checking if user is online 
        // --- if online then sending newMessage to that user 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // so if it is online, emit newMessage event to that specific user
            // io.to(id) is used to emit events to specific userId, but io.emit is used to emit events to all users
            io.to(receiverSocketId).emit("newMessage", newMessage);

            // messages are now emmitted, now you need to listen from frontend 
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage controller: ---> ", error.message);
        res.status(500).json({ error: "Internal Server Error"})
    }
};

// to find messages between me and the clicked user
export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {
                $all : [userToChatId, senderId]
            }
        }).populate("messages");
        // console.log(conversation);

        if(!conversation){
            return res.status(200).json([])
        }
        
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("error in getMessages controller: --->", error.message);
        res.status(500).json({ error: "Internal Server Error" })

    }
};