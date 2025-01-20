import React from "react";

/* accpets a cusomized msg to display to user*/
/* be used on a submiut btn?*/
// TODO: CSS styling
const ModalPopup = ({msg, onClose})=>{

    return(
        <>
            <div className="modal-container">
                <h1>Title</h1>

                <p>{msg}</p>

                <button onClick={onClose}>Close</button>
            </div> 
        </>
    )
}
export default ModalPopup;