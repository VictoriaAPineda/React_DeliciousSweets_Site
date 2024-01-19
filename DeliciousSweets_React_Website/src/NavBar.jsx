import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"

export default function Navbar() {
  return (
    <>
    <div id="top-border">
        <p>- Keeping it Delicious since 1994 -</p>

    </div>
    <section id="header">

        <nav className="nav-menu">
            <ul>
                <Link to="/" ><img src={logo}></img> </Link>
                <li> 
                    <label htmlFor="search">Search: </label>
                    <input type="text" id="search"/>
                </li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>

            </ul>
        </nav>
    </section>
    </>
  )
}

