import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import {CloseIcon} from '../icons/Close';
import styles from './Modal.module.css';

const Modal = ({isOpen, onClose}) => {
    const nodeRef = useRef(null);
    const modal = (
        ReactDOM.createPortal(
            <CSSTransition 
                in={isOpen}
                timeout={300}
                classNames={styles['modal-wrapper']}
                mountOnEnter
                unmountOnExit
                nodeRef={nodeRef}
            >
                <div role="dialog" className={styles['modal-wrapper']} aria-modal aria-label="Modal" aria-hidden={isOpen}>
                    <div className={styles['modal-header']}>
                        <h1>I'm a modal!</h1>
                        <button onClick={onClose}>
                            <CloseIcon/>
                        </button>
                    </div>
                    <div className={styles['modal-body']}>
                        Modal body
                    </div>
                </div>
            </CSSTransition>,
            document.body
        )
    );

    return modal;
};

export default Modal;