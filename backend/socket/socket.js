// import express from 'express';
// import http from "http";
// import { Server } from 'socket.io';

// const app = express();
// // will create socket server on top of express
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ['http://localhost:3000'],
//         methods: ['GET', 'POST',]
//     }
// });

// // to get the online user 
// const userSocketMap = {};

// // listen when connected 
// io.on("connection", (socket) => {
//     console.log("user connected", socket.id);

//     const userId = socket.handshake.query.userId;
//     if(userId !== "undefined") userSocketMap[userId] = socket.id;
//     // io.emit is used to send events to all connected clients 
//     io.emit('getOnlineUsers', Object.keys(userSocketMap));  // get online users

//     // a user is connected. now listen for events of this user 
//     socket.on("disconnect", () =>{
//         // console.log("user disconnected", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))
//     })
// })

// export { app, io, server };




import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    // receiverId is user id,
    return userSocketMap[receiverId];   // returns socket id of that user
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
