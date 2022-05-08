import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { local, server } from "../helpers/api"
import {useLocation} from "react-router-dom";
import InfoBar from './Chat/InfoBar';
import Input from './Chat/Input';
import Messages from './Chat/Messages';
import TextContainer from './Chat/TextContainer'

let socket;

const Chat = () => {
  const {search} = useLocation()
  console.log(search);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const { name, room } = queryString.parse(search);
    console.log(name, room);
    socket = io(local);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [local, search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(msgs => [ ...msgs, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


  return (
    <div className="outerContainer">
    <TextContainer users={users} />
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;