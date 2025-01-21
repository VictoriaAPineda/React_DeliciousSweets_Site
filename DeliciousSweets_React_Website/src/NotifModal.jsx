import React, { useEffect } from "react";

const NotifModal = ({msg, close}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          close();
        }, 1000); 
        return () => clearTimeout(timer);
      }, [close]);

    return(
        /* customize own css ...*/
        <div className="modal-container">
            <p className="modal-msg">{msg}</p>
        </div>
    
    )
}
export default NotifModal;