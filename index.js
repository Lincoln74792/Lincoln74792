const express = require("express")()
const http = require("http").createServer(express)
const io = require("socket.io")(http)

express.get("/",(req,res)=>{
    res.sendFile(__dirname+'/html/site.html')
})
io.on('connection',(io)=>{
    console.log('New connection: '+io.id)
    io.on('msg',msg=>{
        io.broadcast.emit('msg','<strong>'+msg[0] +'</strong>'+': '+ msg[1] + '<br>')
        msg.splice(0, msg.length);
    })

})

http.listen(process.env.PORT||3000,()=>console.log('Ouvindo na porta 3000'))
