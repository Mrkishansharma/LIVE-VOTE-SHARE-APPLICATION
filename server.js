
const express = require('express');

const app = express()

const http = require('http');

const server = http.createServer(app);

const Server = require('socket.io');

const io = Server(server);


const VoteResult = {
    "Party-A": { total:0, percentage:0 },
    "Party-B":{ total:0, percentage:0 },
    "Party-C":{ total:0, percentage:0 }
}

let totalVotes = 0

const VoterIDDB = []


io.on("connection", (socket)=>{
    
    console.log('connection has been made');

    io.emit('result', VoteResult)

    socket.on('vote', (obj)=>{

        if( VoterIDDB.includes(obj.voterID) ){

            socket.emit('alreadyVote', "Can't able to vote multiple times.");

        }else{

            
            VoterIDDB.push(obj.voterID);
            
            totalVotes++

            VoteResult[obj.party].total++;

            for(let key in VoteResult){

                VoteResult[key].percentage = ((100 / totalVotes) * (+VoteResult[key].total)).toFixed(2)

            }
            
            
            console.log('vote done, totol votes; - ', totalVotes, VoteResult);

            io.emit('result', VoteResult);


        }
    })

    socket.on('disconnect', ()=>{

        console.log('user has left the voting system', socket.id);

    })
})





server.listen(3000,()=>{

    console.log(`server is running on port 3000`);

})