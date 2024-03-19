import Navbar from "./Navbar"
import Footerbar from "./Footerbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import Cart  from "./pages/Cart"
import { Route, Routes } from "react-router-dom"
import ProductDetails from "./pages/productDetail"

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar /> {/* Main navigation */}
   
      <div className="container">
        <Routes>
          {/* Collection of links used within website,
          they are define here*/}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          {/*Link from a product to detail page*/}
          <Route path="/productDetail" element={<ProductDetails />}/>

        </Routes>
      </div>
      <Footerbar />
    
    </>
  )
}

export default App