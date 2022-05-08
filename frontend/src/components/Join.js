import { Button } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import "../assets/css/join.css";

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('1');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Ingresa a nuestro chat</h1>
        <div>
          <input placeholder="Correo electronico (example@example.co)" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="sala 1" className="joinInputTwo mt-20" type="text" onChange={(event) => setRoom(event.target.value)} disabled />
        </div>
        <div>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={e => (!name || !room) ? e.preventDefault() : null} href={`/chat?name=${name}&room=${room}`}
          >
            Iniciar
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Join;