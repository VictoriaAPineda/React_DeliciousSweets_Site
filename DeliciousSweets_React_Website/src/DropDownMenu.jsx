import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import DropDownList from './DropdownList';

export default function DropdownMenu({menuState}){
    const [open, setOpen] = useState(false);
    const [openSubmenu, setSubmenu] = useState(false);

    /* closes dropdown if user clicks out of dropdown menu only.*/
    let menuRef = useRef();
    useEffect(()=>{
        let handler =(e)=>{
            if(!menuRef.current.contains(e.target)){
                // If user presses their mouse, outside of menu, it closes
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler)
        /* clean up*/
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });
    /* If menu is closed, close the submenu to avoid it being still opened */
    useEffect(()=>{
        if(!menuState){
            setSubmenu(false)
        }
    }, [menuState])

    return(
        <>
        {/* [] TODO: Revamp to a single drop down, use CSS to make the nesscary changes to reduce code ? */}
        <div className='dropmenu-wrapper'>
            <div className='dropdown-container' ref={menuRef}>
                <div className='dropdown-trigger' onMouseOver={()=>{setOpen(!open)}}>
                    <Link className="desktopProduct" to="#">Products</Link>
                    {/* When screen size is reduced to mobile, symbol appears
                    and triggers subdropdown-menu. If not, desktop dropdown disaplays */}
                    <div className='submenu-trigger' onClick={()=>setSubmenu(!openSubmenu)}>
                        <Link to="#">Products</Link>
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