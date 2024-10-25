import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import DropDownList from './DropdownList';

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
            {/* Normal dropdown of 'Products' */}
            <div className='dropdown-container' ref={menuRef}>
                <div className='dropdown-trigger' onMouseOver={()=>{setOpen(!open)}}>
                    <Link to="/products">Products</Link>
                    <div className='submenu-trigger' onClick={()=>setSubmenu(!openSubmenu)}>
                        {/* rotate symbol when sub menu is opened/active */}
                        <i className= {`bi bi-chevron-up chevorn-open ${openSubmenu ? 'active' : 'inactive'}`}></i>
                    </div>
                </div>
                <div className={`dropdown-menu ${open? 'active':''}`}>
                    <ul>
                        <DropDownList/>
                    </ul>
                </div>
            </div>
            {/* Mobile sub menu of 'Products'*/}
            <div className='subdropdown-container'>
                <div className= {`subdropdown-menu ${openSubmenu? 'active':'inactive'}`}>
                    <ul>
                        {/* TODO: Moblie Dropdowns 
                            Change CSS styles
                        */}
                        <DropDownList/>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}