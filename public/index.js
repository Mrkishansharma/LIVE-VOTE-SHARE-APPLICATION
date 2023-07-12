

const socket = io('http://localhost:3000/', {transports:["websocket"]})


const voterID = document.getElementById('voterID');

const party = document.getElementById('party');


socket.on('alreadyVote', (msg)=>{
    alert(msg)
})

socket.on('result', (result)=>{
    console.log(result);
    displayResults(result)
})


function handleVote(){
    const vID = voterID.value.trim()

    if(party.value && vID){

        socket.emit('vote', {voterID:vID, party:party.value})

    }else if(vID){

        alert('select party first');

    }else{

        alert('enter voter id')
        
    }
}


function displayResults(obj){
    let aVote = document.getElementById('aVote');
    let bVote = document.getElementById('bVote');
    let cVote = document.getElementById('cVote');

    aVote.innerText = obj['Party-A'].percentage + ' % '
    bVote.innerText = obj['Party-B'].percentage + ' % '
    cVote.innerText = obj['Party-C'].percentage + ' % '
}