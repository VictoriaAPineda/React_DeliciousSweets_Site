import React from "react";

/* accpets a cusomized msg to display to user*/
/* be used on a submiut btn?*/
// TODO: CSS styling
const ModalPopup = ({msg, onClose})=>{

    return(
        <>
            <div className="modal-container">
                <i className="bi bi-exclamation-triangle error-icon"></i>
                <h1 className="modal-title">Whoops!</h1>

                <p className="modal-msg">{msg}</p>

                <button onClick={onClose} className="modal-close-btn">Close</button>
            </div> 
        </>
    )
}
export default ModalPopup;