import React from 'react';
import SendIcon from '@mui/icons-material/Send';
const Input = ({ message, setMessage, sendMessage }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button className="sendButton" onClick={(e) => sendMessage(e)}><div><SendIcon /></div></button>
    </form>
);

export default Input;