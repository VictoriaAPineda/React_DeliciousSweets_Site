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
            <div className='dropdown-container' ref={menuRef}>
                <div className='dropdown-trigger' onMouseOver={()=>{setOpen(!open)}}>
                    <Link to="/products">Products</Link>
                    {/* When screen size is reduced to mobile, symbol appears
                    and triggers subdropdown-menu. If not, desktop dropdown disaplays */}
                    <div className='submenu-trigger' onClick={()=>setSubmenu(!openSubmenu)}>
                        <i className= {`bi bi-chevron-up chevorn-open ${openSubmenu ? 'active' : 'inactive'}`}></i>
                    </div>
                </div>
                {/* Normal dropdown of 'Products' */}
                <div className={`dropdown-menu ${open? 'active':''}`}>
                    <ul>
                        <DropDownList/>
                    </ul>
                </div>
            </div>
            {/* Mobile dropdown of 'Products'*/}
            <div className='subdropdown-container'>
                <div className= {`subdropdown-menu ${openSubmenu? 'active':'inactive'}`}>
                    <ul>
                        <DropDownList/>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}