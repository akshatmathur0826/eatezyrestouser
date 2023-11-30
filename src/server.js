const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
//import axios from "axios";


const PORT = process.env.PORT || 4009;


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


  const axios = require("axios")

  
const baseURL = process.env.NODE_ENV === "production"
? "https://eatezy.onrender.com"
: "http://localhost:9090";

const axiosInstance = axios.create({
baseURL
});

let emailid = null;
io.on('connection', (socket) => {
  console.log("---------------------")
  console.log(`A user connected with id ${socket.id}`);

  socket.on('useremailid',(arg)=>{
    emailid = arg
  })
  console.log(emailid)
  axiosInstance.get(`/vieworderdetails?emailid=${emailid}`)
    .then(response => {
      console.log(response.data.orderid+"check")
      socket.on('join-room',(room)=>{
        console.log(room)
        socket.join(room)
        const clientsInRoom = io.sockets.adapter.rooms.get(room);
    console.log(`Clients in room ${room}:`, clientsInRoom);
      })
      socket.on(response.data.orderid,(dataFromUser,room)=>{
        console.log(dataFromUser)
        console.log(room)
        console.log("&&&")
        socket.to(room).emit('recieve',dataFromUser,room)
      })
    });
    
    socket.on("order",(dataFromResto,room)=>{
      console.log(dataFromResto)
      console.log(room)
      socket.to(room).emit('send',dataFromResto,room)
    })

});




httpServer.listen(PORT, () => {
  console.log("run")
});