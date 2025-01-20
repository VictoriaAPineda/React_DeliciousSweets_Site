import infoBannerImg from "/src/images/bread_display.jpg";
import adImg1 from "/src/images/orangeCake.jpg";
import adImg2 from "/src/images/chocolateCupcake.jpg";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MultiCarousel from "../MultiCarousel";
import ProductInfoTabs from "../ProductInfoTabs"
import { Cart } from "../contextAPI/CartContext";
import ModalPopup from "../ModalPopup";


{/*This page is shown when user clicks on view btn of a product.
It will then display details and ordering options. */}
export default function ProductDetails(){

    // id from url sent by products.jsx
    const {id} = useParams();
    const productId = id;

    const [data, setData] =  useState([]);
    const [quantityCount, setQuantityCount] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(true) // false

    const navigate = useNavigate();
    // Target area of screen to move user to view upon clicking on carousel
    const targetRef = useRef();
    const {cart, setCart} = useContext(Cart);
    // console.log(useContext(Cart))
    
    /* 
       Retrieves the state data from the state from the Link to this page 
       the data contains the located page number ex: (?page=2) that will be 
       used to go back to a previos page number a user was on
    */
    // const pageData = location.state;

    // Retrieve data from db of selected products to view (products Collection)
    useEffect(() => {
        axios.get('http://localhost:5000/products')
        .then( product => {
            const productFound = product.data.find(p => p._id === productId);
            setData(productFound)  
            // navigate(`${productFound.category}/${productFound.name}`)
            setQuantityCount(0) // clear input after user naviagtes away
        })
        .catch(err=> console.log(err))
    }, [productId]) 

    const handlePrevious = () => {
        navigate(-1);
    }

    useEffect(()=>{
        window.scrollTo({
            top:0,
            left:0,
            // behavior:'smooth'
        })
    },[])

    const handleIncrement = () =>{
        setQuantityCount(quantityCount + 1)
    }

    const handleDecrement = () =>{
        const q = quantityCount -1
        setQuantityCount(q < 0 ? 0 : q)
    }

    const handleModalClose = () =>{
        setIsModalOpen(false)
    }

    const addToCart = (id, quantity) => {
        // Check to see if item is already in cart
        const repeatItem = cart.find((item) => item.itemId === id)
        if(repeatItem){
            // Add the added-on quantity to the item
            setCart((prev)=> prev.map((item) => 
                item.itemId === id ? {...item, itemQuantity : item.itemQuantity + quantity }: item
            ))
        } 
        // If new item, add to cart
        else if(quantity >= 1){
            const newCartObj = {
                itemId: id,
                itemQuantity: quantity 
            }
            setCart([...cart, newCartObj])   
        } 
        else{
            setIsModalOpen(true)
        }
    }
    /* TODO: [ ] Cleanup pathname to simple name of product instead of objectID */
    return(
     
        <>   
            {isModalOpen && <ModalPopup msg='Must be at least 1 to add to cart' onClose={handleModalClose}/>}
            
            <section id="detailImgBannerContainer">
                <img src={infoBannerImg}></img>
                <p>information</p>
            </section>

            <div id="wrapper" ref={targetRef}>
                <section id="detail_card_container" >
                    {/* <Link to={`/products/${data.category}${pageData}`}> */}
                        <button  className="backBtn" onClick={handlePrevious}><i className="bi bi-arrow-left"></i>Back</button>
                    {/* </Link> */}
                    <div className="productDetailInfoContainer" >
                             <img src={data.image}></img>
                             <div className="info">
                                 <p className="detailProductName">{data.name}</p>
                                 {/* TODO: Average of Reviwers Ratings */}
                                 <div className="detailStars">
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-half"></i>
                                 </div>
                                
                                 <p className="detailPrice">${parseFloat(data.price).toFixed(2)}</p>
                                 <p className="detailDescription">{data.description}</p>
                                 <div className="detailBtnGroup">
                                    {/* Minus quantity*/}
                                    <i className="bi bi-dash-circle-fill" onClick={handleDecrement}></i>
                                    {/*Current quantity*/}
                                    <div className="quantity"> {quantityCount}</div>
                                    {/* Add quantity*/}
                                    <i className="bi bi-plus-circle-fill" onClick={handleIncrement}></i>
                                    {/* TODO: Add to Cart will take the latest number and add it in cart*/}
                                    <button className="addToCartBtn" onClick={()=>addToCart(data._id, quantityCount)}>Add To Cart +</button>
                                 </div>
                             </div>
                    </div>

                    {/* Display Product Reviews and specification info*/}
                    <div className="specificationAndReviewContainer">
                        {/* Pass in product id */}
                        <ProductInfoTabs productDataId ={data._id}/>
                    </div>
                </section>

                {/* TODOS: 
                    1.Cart be updated in real-time to cart icon on screen via a circle count
                    2. reviews by proudct's id, in own database
                */}
                <section id="advertisments">
                    <div className="mainAdImgs">
                        <div className="img1">
                            <p>Text Here 01</p>
                         <img src={adImg1}></img>
                        </div>
                       <div className="img2">
                        <p>Text Here 02</p>
                        <img src={adImg2}></img>
                       </div>
                       
                    </div>
                
                    {/* Display products within the same category */}
                    <div className="relatedProductsCarouselContainer">
                        <MultiCarousel productCategory = {data.category} currProductId = {data._id} moveScreenToTarget = {targetRef}/>
                    </div>
                </section>
               
            </div>
        </>
    )
}