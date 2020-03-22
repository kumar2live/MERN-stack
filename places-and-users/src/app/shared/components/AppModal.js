import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import ShadowBackGround from './ShadowBackGround';

import './AppModal.css';

const ModalOverlay = (props) => {
  const content = (
    <div className='appmodal'>
      <header className='appmodal-header'>
        <h4>{props.header}</h4>
      </header>

      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className='appmodal-content'>
          {props.children}
        </div>

        <footer className='appmodal-footer'>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('appmodal-hook'))
}

const AppModal = props => {
  return (
    <React.Fragment>
      {props.show && <ShadowBackGround onClick={props.onCancel}/>}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={2000}
        classNames='appmodal'      
      >
        <ModalOverlay {...props}/>
      </CSSTransition>
    </React.Fragment>
  );
}

export default AppModal;
