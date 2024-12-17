import infoBannerImg from "/src/images/bread_display.jpg";
import adImg1 from "/src/images/orangeCake.jpg";
import adImg2 from "/src/images/chocolateCupcake.jpg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MultiCarousel from "../MultiCarousel";

{/*This page is shown when user clicks on view btn of a product.
It will then display details and ordering options. */}
export default function ProductDetails(){

    // id from url sent by products.jsx
    const {id} = useParams();
    const productId = id;
    
    const [data, setData] =  useState([]);
    const navigate = useNavigate();
    // Target area of screen to move user to view upon clicking on carousel
    const targetRef = useRef();

    // const location = useLocation();
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
 
    /* TODO: [ ] Cleanup pathname to simple name of product instead of objectID */
    return(
        <>
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
                                 <div className="detailStars">
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-fill"></i>
                                     <i className="bi bi-star-half"></i>
                                 </div>
                                
                                 <p className="detailPrice">{data.price}</p>
                                 <p className="detailDescription">{data.description}</p>
                                 <div className="detailBtnGroup">
                                     {/*TODO: btns has a onClick event to inc/dec */}
                                     <i className="bi bi-dash-circle-fill"></i>
                                     <div className="quantity">0</div>
                                     <i className="bi bi-plus-circle-fill"></i>
                                     {/* TODO: Add to Cart will take the latest number and add it in cart*/}
                                     <button className="addToCartBtn">Add To Cart +</button>
                                 </div>
                             </div>
                    </div>

                    {/* TODO: Bring in data from Reveiws db */}
                    <div className="specificationAndReviewContainer">
                        {/* Specs.(size/ingredients) and Reviews are tabbed. Clicking to displays section. Specs displayed by default. 
                        Use states.[selected,setSelected] = useState(_default_here_) 
                        the one selecetd will hav its bg color changed*/}
                        <div className="tabGroup">
                            <p className="tabbedText selected">Specifiction</p>
                            <p className="tabbedText">Reviews</p>
                        </div>
                      
                        <p className="displayedInfo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo excepturi repudiandae mollitia rem vero voluptates minima assumenda architecto consequuntur quia praesentium facilis, impedit debitis! Aut porro temporibus rerum voluptatibus neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quia, quis facere dolore in nemo quaerat harum eveniet ex modi sequi. Numquam, illo suscipit! Pariatur quo quasi quas vero eum?</p>
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