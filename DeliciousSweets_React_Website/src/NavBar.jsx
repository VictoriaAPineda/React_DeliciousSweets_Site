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
        <Link to="/" ><img src={logo}></img> </Link>
        <div className="search-container"> 
            <i class="bi bi-search search-icon"></i> 
            <input type="text" id="search"/>
        </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart <i className="bi bi-cart2"></i></Link></li>
                {/* <Link to="" id="close-menu"><i class="bi bi-list"></i></Link> */}
            </ul>
        </nav>
    </section>
    </>
  )
}

