import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"
import { useContext, useEffect, useState } from "react"
import React from 'react'
import DropdownMenu from "./DropdownMenu";
import { Cart } from "./contextAPI/CartContext";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const {cart} = useContext(Cart)

    const toggleMenu = () =>{
        setIsOpen((open) => !open)
    }
    const closeMenu = () =>{
        setIsOpen(false);
    }
    const cartQuantity = cart.reduce((acc, item)=>acc+ item.itemQuantity, 0)

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
                            {/* menu state = if meny is displayed*/}
                            <DropdownMenu menuState = {isOpen}/>
                        </li>
                        <li><Link to="/cart">Cart <i className="bi bi-cart2"></i>({cartQuantity})</Link></li>
                    </ul>
                </nav>
                {/* list/hamburger icon for mobile menu */}
                {/* '#' to prevent navigation redirection issue */}
                <Link to="#" ><i className="bi bi-list list-trigger" onClick={toggleMenu}></i></Link>
                {/* If the ul menu is open (isOpen = true), this "x" icon will also display */}
                <Link to ="#"><i className= {`bi bi-x list-close-trigger ${isOpen ? "is-open": ""}`} onClick={closeMenu}></i></Link>
            </section>
    </>

  )
}

