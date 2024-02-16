import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"

export default function DropdownMenu(){
    const [open, setOpen] = useState(false);

    /* closes dropdown if user clicks out of dropdown menu only.*/
    let menuRef = useRef();
    useEffect(()=>{
        let handler =(e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler)
        /* clean up*/
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });

    return(
        <div className='dropdown-container' ref={menuRef}>
            <div className='dropdown-trigger' onMouseOver={()=>{setOpen(!open)}}>
                <Link to="/products">Products</Link>
            </div>
                <div className={`dropdown-menu ${open? 'active':'inactive'}`}>
                    <ul>
                        <DropdownItem itemText = {'Option1'}/>
                        <DropdownItem itemText = {'Option2'}/>
                        <DropdownItem itemText = {'Option3'}/>
                        <DropdownItem itemText = {'Option4'}/>
                    </ul>
                </div>
        </div>
    )
}
function DropdownItem({itemText}){
    return(
        <li className='dropdown-item'>
            <a>{itemText}</a>
        </li>
    );
}