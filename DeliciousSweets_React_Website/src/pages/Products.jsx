import BannerSpecial from "../BannerSpecial";
import brownieImg from "/src/images/brownines-img.png"
import cupcakeImg from "/src/images/cupcakes.jpg"
import doughnutImg from "/src/images/doughnuts.jpg"


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
                    <div className="product">

                    </div>

                </div>


                <div className="pagination_container">

                </div>
            </section>
        </>
    )
}
export default Products;