import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import Cart  from "./pages/Cart"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar /> {/* Main navigation */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </div>
    </>
  )
}

export default App