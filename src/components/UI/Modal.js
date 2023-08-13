import classes from './Modal.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';


/*The Backdrop component is responsible for displaying a semi-transparent background when the modal is open. 
It takes a prop onClose which is called when the user clicks on the background*/
const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

/*The ModalOverlay component defines the main content area of the modal. It takes a children prop which is
any content that should be displayed inside the modal*/
const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

/*The portalElement constant is used to specify the location in the DOM where the Modal component should be
rendered. It is typically a div element with a unique ID that is placed outside of the component hierarchy*/
const portalElement = document.getElementById('overlays');


/*The Modal component returns a Fragment that contains two ReactDOM.createPortal() calls. This method allows 
the Backdrop and ModalOverlay components to be rendered outside of their parent components and into the portalElement. */
const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
};

export default Modal;