import React from 'react';
import ReactDOM from 'react-dom';

import './ShadowBackGround.css';

const ShadowBackGround = props => {
  return ReactDOM.createPortal(
    <div className="ShadowBackGround" onClick={props.onClick}></div>,
    document.getElementById('ShadowBackGround-hook')
  );
};

export default ShadowBackGround;

