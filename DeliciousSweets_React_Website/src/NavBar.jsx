import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"
import { useContext, useEffect, useState } from "react"
import React from 'react'
import DropdownMenu from "./DropdownMenu";
import { Cart } from "./contextAPI/CartContext";
import axios from "axios";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const {cart} = useContext(Cart);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);

    const toggleMenu = () =>{
        setIsOpen((open) => !open)
    }
    const closeMenu = () =>{
        setIsOpen(false);
    }
    const cartQuantity = cart.reduce((acc, item)=>acc+ item.itemQuantity, 0)

    const handleSearchTerm = (e) =>{
        const term = e.target.value;
        setSearchTerm(term)    
    }

    useEffect(()=>{
        if(searchTerm.length > 0){
            const lowerCaseTerm = searchTerm.toLowerCase();
            const filteredSearchResults =  data.filter(product => 
                product.name.toLowerCase().includes(lowerCaseTerm)
            )
            setSearchResults(filteredSearchResults);
        }else{
            setSearchResults([])
        }
    }, [searchTerm])

    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then((product) => {
            setData(product.data.sort((a,b) => (a.name > b.name) ? 1: -1))
        })
        .catch(err => console.log(err))
    },[])
 
  return (
    <>
            <div id="top-border">
                <p>- Keeping it Delicious since 1994 -</p>

            </div>
            <section id="header">

                <nav className="nav-menu">
                    <Link to="/" ><img src={logo}></img> </Link>


                    {/* Search bar */}
                    <div className="search-container"> 
                        <i className="bi bi-search search-icon"></i> 
                        <input type="text" 
                            id="search"
                            placeholder="Searching..."
                            value={searchTerm}
                            onChange={handleSearchTerm}/>
                            <ul className="search-results-list">
                                {/* [ ] Add Page Links */}
                                {searchResults.map(product => (
                                    <li key={product._id}>{product.name}</li>
                                ))}
                            </ul>
                            { searchResults.length <1 && <p className="search-fail">No Matches Found</p> }
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

