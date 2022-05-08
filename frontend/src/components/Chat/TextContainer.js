import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { green } from '@mui/material/colors';

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    {users ? (
      <div>
        <h1>Conectados</h1>
        <div className='activeContainer'>
          <h2>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name} <Brightness1Icon sx={{ color: green[500] }}/>
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;