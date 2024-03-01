import BannerSpecial from "../BannerSpecial";
import brownieImg from "/src/images/brownines-img.png"
import cupcakeImg from "/src/images/cupcakes.jpg"
import doughnutImg from "/src/images/doughnuts.jpg"
import productImg from "/src/images/chocolateStrawberryCake.jpg";


function Products(){
    const bannerImages = [brownieImg,cupcakeImg,doughnutImg,];
    return(
        <>
            
            <section>
                <BannerSpecial images = {bannerImages}/>
            </section>

            <section id="filter_products_container">
                <p className="catBtnGroupTitle">Cartegories :</p>
                <button className="filterBtn">Filter1</button>
                <button className="filterBtn" >Filter2</button>
                <button className="filterBtn" >Filter3</button>
                <button className="filterBtn" >Filter4</button>
                <button className="filterBtn" >Filter5</button>
                <button className="filterBtn" >Filter6</button>

            </section>

            <section id="products_container">
                <div className="catTitle_container">
                    <div></div>
                        <p className="large-font catTitle">Cakes</p>
                    <div></div>
                </div>

                <div className="products_grid_container">
                    {/*mockup for later code with data array objects */}
                    <div className="product box-shadow">
                        <img src={productImg}></img>
                        <div className="product_details_container">
                            <p className="productName">Product Name</p>
                            <p className="productDescription">This is a short description of the product meant to entice users to click and make a purchase.</p>
                            <p className="price">$10.99</p>
                            <button className="viewBtn">View</button>
                        </div>
                    </div>
                    <div className="product box-shadow">
                        <img src={productImg}></img>
                        <div className="product_details_container">
                            <p className="productName">Product Name</p>
                            <p className="productDescription">This is a short description of the product meant to entice users to click and make a purchase.</p>
                            <p className="price">$10.99</p>
                            <button className="viewBtn">View</button>
                        </div>
                    </div>
                    <div className="product box-shadow">
                        <img src={productImg}></img>
                        <div className="product_details_container">
                            <p className="productName">Product Name</p>
                            <p className="productDescription">This is a short description of the product meant to entice users to click and make a purchase.</p>
                            <p className="price">$10.99</p>
                            <button className="viewBtn">View</button>
                        </div>
                    </div>
                    <div className="product box-shadow">
                        <img src={productImg}></img>
                        <div className="product_details_container">
                            <p className="productName">Product Name</p>
                            <p className="productDescription">This is a short description of the product meant to entice users to click and make a purchase.</p>
                            <p className="price">$10.99</p>
                            <button className="viewBtn">View</button>
                        </div>
                    </div>
                    {/* Page Nav */}
                    <div className="pagination_container">
                        <div className="decoLine"></div>
                        <button><i class="bi bi-caret-left-fill"></i></button>
                        <p>1</p>
                        <i class="bi bi-slash-lg"></i>
                        <p>2</p>
                        <button><i class="bi bi-caret-right-fill"></i></button>
                        <div className="decoLine"></div>
                    </div>
                </div>

           
            </section>
        </>
    )
}
export default Products;