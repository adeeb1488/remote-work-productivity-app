import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');
function Chat() {
    const[meetings, setMeetings] = useState([]);
    const [webSocket, setwebSocket] = useState(null);
    const [message, setMessage] = useState('');
    const[chatMessages, setChatMessages] = useState([]);

    useEffect(()=>{
        socket.on('chat message', (msg)=>{
            console.log('Message received:', msg);
            setChatMessages((previousMessages) => [...previousMessages, msg])
           
        })
        // const newWebsocket = new WebSocket('ws://localhost:8080');
        // setwebSocket(newWebsocket);

        // newWebsocket.onmessage=(event) =>{
        //     const message = JSON.parse(event.data);
        //     setChatMessages(previousMessages => [...previousMessages,message]);
        // }
        return () =>{
            socket.off('chat message')
        }
    },[])
    useEffect(() => {
        console.log('Chat Messages State:', chatMessages);
    }, [chatMessages]);

    const sendMessage = ()=>{
        console.log("----------SEND MESSAGE FUNCTION!!------------")
        // if(webSocket && message.trim()) {
        //     const newMessage = {
        //         sender:'User',
        //         message:message.trim()
        //     }
        //     webSocket.send(JSON.stringify(newMessage));
        //     setMessage('');
        //     console.log(newMessage)
        // }
        if(message.trim()){
            const newMessage = {
                sender:'User',
                message:message.trim()
            }
            console.log('Sending message:', newMessage);
            socket.emit('chat message', newMessage);
            setMessage('');
            
        }
        else {
            console.log('Message is empty, not sending.');
        }
    }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 2 }}>
        <Button vartiant="contained" startIcon={<AddIcon />}>
            Start a Meeting
        </Button>
        <List sx={{ marginBottom: 2 }}>
            {meetings.map((meeting,index)=>(
                <ListItem key = {index}>
                    <ListItemText primary={meeting.name} secondary={meeting.time} />
                </ListItem>

            ))}
        </List>
        <Box sx={{ flex: 1, overflowY: 'auto', marginBottom: 2}}>
            <List>
                {
                chatMessages.map((msg,index)=>(
                    <>
                    <ListItem sx={{ width: '100%', backgroundColor: "#36ff7f", borderRadius: 2 }} key={index}>
                        <ListItemText primary={msg.sender} secondary={msg.message} />
                    </ListItem>
                    <Box sx={{backgroundColor:"red"}}></Box>
                    </>
                    
                ))   
                }
                
            </List>
        </Box>
        <Box sx={{ width:"100%", marginBottom: 3}}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TextField label="Message" value={message} onChange={(e)=>setMessage(e.target.value)} fullWidth sx={{flexGrow:1, marginRight:1, backgroundColor:"white", borderRadius:4}}/>
        
                <Button variant="contained" onClick={sendMessage}>Send</Button>
                </Box>
            </Box>
    </Box>
  )
}

export default Chat;