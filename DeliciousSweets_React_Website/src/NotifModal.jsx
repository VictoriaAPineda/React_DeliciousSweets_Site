import React, { useEffect } from "react";

const NotifModal = ({msg, close}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          close();
        }, 3000); 
        return () => clearTimeout(timer);
      }, [close]);

    return(
        /* customize own css ...*/
        <div className="notif-modal-container">
            <p className="notif-modal-msg">{msg}</p>
        </div>
    
    )
}
export default NotifModal;