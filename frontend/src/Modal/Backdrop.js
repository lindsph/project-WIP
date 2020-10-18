import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Backdrop.module.css';

const Backdrop = ({isOpen, onClick}) => {
    const nodeRef = useRef(null);
    const backdrop = (
        ReactDOM.createPortal(
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames={styles.backdrop}
                mountOnEnter
                unmountOnExit
                nodeRef={nodeRef}
            >
                <div onClick={onClick} className={styles.backdrop}></div>
            </CSSTransition>,
            document.body
        )
    );

    return backdrop;
};

export default Backdrop;