import infoBannerImg from "/src/images/bread_display.jpg";
import mainProductImg from "/src/images/placeholderDetailImg.jpg";
import adImg1 from "/src/images/orangeCake.jpg";
import adImg2 from "/src/images/chocolateCupcake.jpg";
import { Link } from "react-router-dom";
import ProductMultiCarousel from "../MultiCarousel"

{/*This page is shown when user clicks on view btn of a product.
It will then display details and ordering options. */}
export default function ProductDetails(){
    return(
        <>
            <section id="detailImgBannerContainer">
                <img src={infoBannerImg}></img>
                <p>information</p>
            </section>
            <div id="wrapper">
                <section id="detail_card_container">
                    {/* Take user back to their browsing point. Temporary link */}
                    <Link to="/products"><button className="backBtn"><i className="bi bi-arrow-left"></i>Back</button></Link>
                    <div className="productDetailInfoContainer">
                        <img src={mainProductImg}></img>
                        <div className="info">
                            <p className="detailProductName">Fancy Name</p>
                            <div className="detailStars">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i>
                            </div>
                           
                            <p className="detailPrice">$12.00</p>
                            <p className="detailDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, corporis? Nesciunt maxime temporibus illum, perspiciatis nisi cupiditate perferendis minus obcaecati odit voluptates veritatis explicabo! Ratione iusto in blanditiis eius ducimus!</p>
                            <div className="detailBtnGroup">
                                {/*TODO: btns has a onClick event to inc/dec */}
                                <i className="bi bi-dash-circle-fill"></i>
                                <div className="quantity">0</div>
                                <i className="bi bi-plus-circle-fill"></i>
                                {/*Add to Cart will take the latest number and add it in cart*/}
                                <button className="addToCartBtn">Add To Cart +</button>
                            </div>
                        </div>
                    </div>
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

                {/* TODOS: 1.Carousel of items each link(img) to the product's detail page
                2.Cart be updated in real-time to cart icon on screen via a circle count
                3. reviews by proudct's id, in own database
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
                
                    <div className="relatedProductsCarouselContainer">
                            {/*TODO: Add Carousel of produtcs in same category user seaching in.
                            Obtainer info based on Products page cat. selection (props) */}  
                            <ProductMultiCarousel/>

                    </div>
                </section>
               
            </div>
        </>
    )
}