// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//     return useContext(SocketContext)
// }

// export const SocketContextProvider = ({children}) => {
//     const [socket, setSocket] = useState(null);
//     const [onLineUser, setOnlineUser] = useState([]);
//     const {authUser} = useAuthContext()

//     useEffect(() => {
//         // if user is authenticated, make a connection with backend 
//         if(authUser){
//             const socket = io("http://localhost:8000", {
//                 query: {
//                     userId: authUser._id
//                 }
//             })
//             setSocket(socket);
//             // to get online users 
//             socket.on("getOnlineUsers", (users) => {
//                 setOnlineUser(users)
//             })

//             // will close socket if component unmount 
//             return () => socket.close();
//         } else {
//             // if not authenticated, close the connection
//             if(socket){
//                 socket.close();
//                 setSocket(null);
//             } 
//         }
//     }, [authUser])

//     return <SocketContext.Provider value={{socket, onLineUser}}>
//         {children}
//     </SocketContext.Provider>
// }



import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("https://letschat-jtbf.onrender.com/", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

