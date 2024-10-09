import { Link } from "react-router-dom"

import BannerSpecial from "../BannerSpecial";
import brownieImg from "/src/images/brownines-img.png"
import cupcakeImg from "/src/images/cupcakes.jpg"
import doughnutImg from "/src/images/doughnuts.jpg"
import productImg from "/src/images/chocolateStrawberryCake.jpg";
import { useEffect, useState } from "react";
import axios from 'axios';


function Products(){
    // State to hold the data retrieved from MongoDB
    const [data, setData] = useState([])
    /**  
     * TODO: Buttons send a new query to display only a specific category
     * of products
    **/

    // Images for the carousel banner
    const bannerImages = [brownieImg,cupcakeImg,doughnutImg,];


    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then(product => setData(product.data))
        .catch(err => console.log(err))
    },[])
   
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
                    {/* TODO: Display at max 12 items (2 cols of 6 at full screen)*/} 
                    { data.map((product)=> (
                        <div key={product._id}>
                             <div className="product box-shadow">
                                <img src={product.image}></img>
                                <div className="product_details_container">
                                    <p className="productName">{product.name}</p>
                                    <p className="productDescription">{product.description}</p>
                                    <p className="price">${product.price}</p>
                                    {/* TODO: Link to a custom prefilled detail page */}
                                    <Link className={"view_link"} to="/productDetail"><button className="viewBtn">View</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
     
                    {/* Page Nav */}
                    <div className="pagination_container">
                        <div className="decoLine"></div>
                        <div className="navigation">
                            <button className="prevPageBtn"><i className="bi bi-caret-left-fill"></i></button>
                            <p>1</p>
                            <i className="bi bi-slash-lg"></i>
                            <p>2</p>
                            <button className="nextPageBtn"><i className="bi bi-caret-right-fill"></i></button>
                        </div>
                        <div className="decoLine"></div>
                    </div>
                </div>

           
            </section>
        </>
    )
}
export default Products;