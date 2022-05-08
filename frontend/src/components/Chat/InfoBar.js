import React from 'react';
import { lightBlue } from '@mui/material/colors';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import CloseIcon from '@mui/icons-material/Close';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>Sala  {room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><CloseIcon sx={{ color: lightBlue[50] }}/></a>
    </div>
  </div>
);

export default InfoBar;