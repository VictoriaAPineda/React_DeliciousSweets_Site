import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"

export default function DropdownMenu(){
    const [open, setOpen] = useState(false);
    const [openSubmenu, setSubmenu] = useState(false);

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
        <>
        <div className='dropmenu-wrapper'>

        
            <div className='dropdown-container' ref={menuRef}>
                {/* Normal dropdown of 'Products' */}
                <div className='dropdown-trigger' onMouseOver={()=>{setOpen(!open)}}>
                    <Link to="/products">Products</Link>
                    <div className='submenu-trigger' onClick={()=>setSubmenu(!openSubmenu)}>
                    <i className= "bi bi-chevron-up chevorn-open"></i>
                </div>
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
            {/* TODO: Working on mobile sub menu of 'Products'*/}
            <div className='subdropdown-container'>
                <div className= {`subdropdown-menu ${openSubmenu? 'active':'inactive'}`}>
                    <ul>
                        <DropdownItem itemText = {'sub-option 01'}/>
                        <DropdownItem itemText = {'sub-option 02'}/>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
function DropdownItem({itemText}){
    return(
        <li className='dropdown-item'>
            <a>{itemText}</a>
        </li>
    );
}