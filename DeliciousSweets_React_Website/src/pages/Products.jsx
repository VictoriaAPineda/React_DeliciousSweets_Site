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

    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then(product => setData(product.data))
        .catch(err => console.log(err))
    },[])

    // Current Page being displayed. Start at Page #1
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    // Finds the last product index of current page 
    // ex: 2nd page x 12 = product index of 24
    const lastIndex = currentPage * productsPerPage;
    // ex: 24 - 12 = 12. Meaning 13 will be the first product index for the 2nd page
    const firstIndex = lastIndex - productsPerPage;
    // Divide up the data throughout pages 
    const products = data.slice(firstIndex, lastIndex);
    const numOfPages = Math.ceil(data.length / productsPerPage); // 49/12 = 4.08 = 5 pages total

    function nextPage(){
        if(currentPage !== numOfPages){
            setCurrentPage(currentPage + 1)
        }
    }
    function prevPage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }

    /**  
     * TODO: Buttons send a new query to display only a specific category
     * of products
    **/

    // Images for the carousel banner
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
                        {/* TODO: Change depending on filter btn selected */}
                        <p className="large-font catTitle">Cakes</p>
                    <div></div>
                </div>

                <div className="products_grid_container">
                    { products.map((product)=> (
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
                            <button className="prevPageBtn"><i className="bi bi-caret-left-fill" onClick={prevPage}></i></button>
                            <p>{currentPage}</p>
                            <i className="bi bi-slash-lg"></i>
                            <p>{numOfPages}</p>
                            <button className="nextPageBtn"><i className="bi bi-caret-right-fill" onClick={nextPage}></i></button>
                        </div>
                        <div className="decoLine"></div>
                    </div>
                </div>

           
            </section>
        </>
    )
}
export default Products;