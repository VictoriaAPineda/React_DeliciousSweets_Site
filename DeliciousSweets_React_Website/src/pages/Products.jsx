import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"

import BannerSpecial from "../BannerSpecial";
import brownieImg from "/src/images/brownines-img.png"
import cupcakeImg from "/src/images/cupcakes.jpg"
import doughnutImg from "/src/images/doughnuts.jpg"
import { useEffect, useState } from "react";
import axios from 'axios';

function Products(){
    /* Getting (destructuring) the Category (:cat) from the url in DropdownList.jsx route 
    ** {`/products/${category}`}
    */
    const {cat} = useParams();
    const dropdownCatSelection = cat;

    const bannerImages = [brownieImg,cupcakeImg,doughnutImg,];    
    const categoryList = ["brownie", "cake", "cheesecake","cookie" , "cupcake", "doughnut","pastry"];

    const [data, setData] = useState([]) // State to hold the data retrieved from MongoDB
    const [filteredData, setFilteredData] = useState([]);
    const [category, setCategory] = useState([]); 
    const [searchParams, setSearchParams] = useSearchParams() // read/modify the query param to url
    // const location = useLocation(); // Hold the current Url information 

    // Will be default to page 1 or will read the modified URL to display page number within the URL
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

    // Adds a new param the URL for tracking pages called 'page' ex: ( page = page number)
    const handlePageParam = (key,value) =>{
        setSearchParams(p =>{
            p.set(key, value)
            return p
        })
    }
    // Updates/Modifies the page number in the URL parameter as user navigates
    useEffect(()=>{
        handlePageParam('page', currentPage)
    },[currentPage, category])
  
    // Retrieveing data from db
    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then(product => {
            // Sort data by name
            setData(product.data.sort((a,b) => (a.name > b.name) ? 1: -1))
            setFilteredData(product.data.filter(p=>p.category === dropdownCatSelection)) 
            handlePageParam('page', currentPage)
        })
        .catch(err => console.log(err))
    },[category, dropdownCatSelection]) 

    /*  Fixes page issue where user navigates through dropdown (only, not filter btns) 
    *   and naviagtes to a page, then selects another category through dropdown, and
    *   incorrectly displays a diffetnet page of products and page number,
    *   inseatd of defaulting to page 1
    *   ex:  viewing page 2 of pastry -> selects brownies = is shown page 2 of brownies, instead *   of page 1
    */
    useEffect(()=>{
        setCategory(dropdownCatSelection)
        if(searchParams.get("page") === null){
            setCurrentPage(1)
        }
    },[dropdownCatSelection])

    // User selects a category button to display certain products
    const onCategoryClick = (category) => () => {
        const filtered = data.filter( product =>{
            return product.category === category;
        })
        setCurrentPage(1)
        setCategory(category)// Category title that is displayed
        setFilteredData(filtered)   
    };
   
    // Product display
    const productsPerPage = 6;
    // Finds the last product index of current page 
    const lastIndex = currentPage * productsPerPage; // ex: 2nd page x 12 = last product index of 24
    const firstIndex = lastIndex - productsPerPage; // ex: 24 - 12 = 12. 13 is first product index for the 2nd page
    const products = filteredData.slice(firstIndex, lastIndex); // Divide up the data into pages 
    const numOfPages = Math.ceil(filteredData.length / productsPerPage); // 49/12 = 4.08 = 5 pages total

    useEffect(()=>{
        /** Prevents an issue where user is on higher n-page of a category of products,
        * selects another category that contains less pages but displays 
        * a empty/out of bounds page 
        **/
        if(currentPage > numOfPages && numOfPages > 0){
            setCurrentPage(1)
        }
    }, [currentPage, numOfPages])// runs whenever user navigates via pagination

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
   
    return(
        <>
            <section>
                <BannerSpecial images = {bannerImages}/>
            </section>

            {/* Buttons to filter product types displayed */}
            <section id="filter_products_container">
                <p className="catBtnGroupTitle">Cartegories :</p>
                {
                    categoryList.map((category, index)=>(
                        <Link className="filterBtnLink" key={category}to ={`/products/${category}`}>
                            <button 
                                type="button" 
                                key={category}
                                onClick={onCategoryClick(category)}
                                className="filterBtn"
                            >
                                {category}
                            </button>  
                        </Link>
                    ))
                }
            </section>

            <section id="products_container">
                {/* Category Title that is currently displayed */}
                <div className="catTitle_container">
                    <div></div>
                        <p className="large-font catTitle">{category}</p>
                    <div></div>
                </div>
                {/* Products display */}
                <div className="products_grid_container">
                    {/* Each product's displayed div */}
                    { products.map((product)=> (
                        <div key={product._id}>
                             <div className="product box-shadow">
                                <img src={product.image}></img>
                                <div className="product_details_container">
                                    <p className="productName">{product.name}</p>
                                    <p className="productDescription">{product.description}</p>
                                    <p className="price">${product.price}</p>
                                    {/* [1] Links to a product's own info page based on their id. 
                                    *   [2]location.search holds the current URL query string. 
                                    *   Used here to further specify the page number of the 
                                    *  'page' parameter to return to the specific page user left before viewing 
                                    *   a product detail page after using the back button  
                                    */}
                                    {/* removed state={location.search} */}
                                    <Link className={"view_link"} to={`/productDetails/${product._id}`}>
                                        <button className="viewBtn" >View</button>
                                    </Link>
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