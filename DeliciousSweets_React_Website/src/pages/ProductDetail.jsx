import infoBannerImg from "/src/images/bread_display.jpg";

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
                    <button className="backBtn">Back</button>
                    <div className="productDetailInfoContainer">
                        <img src={''}></img>
                        <div>
                            <p className="detailProductName">Fancy Name</p>
                            <p>* * * * *</p>
                            <p className="detailPrice">$12.00</p>
                            <p className="detailDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, corporis? Nesciunt maxime temporibus illum, perspiciatis nisi cupiditate perferendis minus obcaecati odit voluptates veritatis explicabo! Ratione iusto in blanditiis eius ducimus!</p>
                            <div className="detailBtnGroup">
                                <button id="subtractAmt">-</button>
                                <input type="number" name="" id="productQuantity" />
                                <button id="addAmt">+</button>
                                {/*Add to Cart will take the latest number and add it in cart*/}
                                <button className="addToCartBtn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="specificationAndReviewContainer">
                        {/* Specs.(size/ingredients) and Reviews are tabbed. Clicking to displays section. Specs displayed by default. 
                        Use states.[selected,setSelected] = useState(_default_here_) */}
                        <p className="tabbedText selected">Specifiction</p>
                        <p className="tabbedText">Reviews</p>
                        <p className="displayedInfo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo excepturi repudiandae mollitia rem vero voluptates minima assumenda architecto consequuntur quia praesentium facilis, impedit debitis! Aut porro temporibus rerum voluptatibus neque?</p>
                    </div>
                </section>
                {/* TODOS: 1.Carousel of items each link(img) to the product's detail page
                2.Cart be updated in real-time to cart icon on screen via a circle count
                3. reviews by proudct's id, in own database
                */}
                <section id="productAdsContainer">
                        <img src={''}></img>
                        <img src={''}></img>
                        <div className="relatedProductsCarouselContainer">
                            {/* Add Carousel of produtcs in same category user seaching in.
                            Obtainer info based on Products page cat. selection (props) */}
                            <p>Similar Tastes!</p>
                        </div>
                </section>
            </div>
        </>
    )
}