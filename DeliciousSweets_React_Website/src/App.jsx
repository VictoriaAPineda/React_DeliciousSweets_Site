import Navbar from "./Navbar"
import Footerbar from "./Footerbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import Receipt from "./pages/Receipt"
import { Route, Routes } from "react-router-dom"
import ProductDetails from "./pages/ProductDetail"
import UserCart from "./pages/UserCart"

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <>
      <Navbar /> {/* Main navigation */}
   
      {/* <div className="container"> */}
        <Routes>
          {/* Collection of links used within website,
          they are define here*/}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products">
            {/* Preload a category selection to display */}
            <Route path=":cat/:page" element ={<Products/>} />
            <Route path= ":cat" element={<Products/>}/> 
          </Route>
          <Route path="/cart" element={<UserCart />} />
          <Route path="/productDetails">
            {/* Each product's personal page with its own data */}
            <Route exact path=":id" element={<ProductDetails />}/>
            {/* <Route path=":cat/:name" element={<ProductDetails />}/> */}
          </Route>
          <Route path="/receipt" element={<Receipt/>}/>
        </Routes>
      {/* </div> */}
      <Footerbar />
    
    </>
  )
}

export default App