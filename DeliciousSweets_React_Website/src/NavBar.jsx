import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"
import { useState } from "react"
import React from 'react'
import DropdownMenu from "./DropdownMenu";
export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () =>{
        setIsOpen((open) => !open)
    }
    const closeMenu = () =>{
        setIsOpen(false);
    }

  return (
    <>
            <div id="top-border">
                <p>- Keeping it Delicious since 1994 -</p>

            </div>
            <section id="header">

                <nav className="nav-menu">
                    <Link to="/" ><img src={logo}></img> </Link>
                    <div className="search-container"> 
                        <i className="bi bi-search search-icon"></i> 
                        <input type="text" id="search"/>
                    </div>
                    {/* if the toggle value is true, add class is-open, otherwise it's hidden */}
                    <ul className= {`${isOpen ? "is-open" : ""}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li>
                            <DropdownMenu/>
                        </li>
                        <li><Link to="/cart">Cart <i className="bi bi-cart2"></i></Link></li>
                    </ul>
                </nav>
                {/* list icon for mobile menu */}
                <Link to="" ><i className="bi bi-list list-trigger" onClick={toggleMenu}></i></Link>
                {/* If the ul menu is open (isOpen = true), this "x" icon will also display */}
                <Link to =""><i className= {`bi bi-x list-close-trigger ${isOpen ? "is-open": ""}`} onClick={closeMenu}></i></Link>
            </section>
    </>

  )
}

