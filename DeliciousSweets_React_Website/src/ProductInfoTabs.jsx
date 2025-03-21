import React, { Suspense, useEffect, useRef, useState } from "react";
import StarRatingDisplay from "./starRatingDisplay";
import axios from "axios";

// Note: Mock data set for cookies - > macaroons only filled with reviews (fill in mock data later)

function Tabs({productDataId}){
    
    const [specs, setSpecs] = useState([]);
    const [reviews, setReviews] = useState([])
    const [activeTab, setActiveTab] = useState(0);// tab index 0 default


    /* Retrieveing data from Products db*/
    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then(product =>{
            const productMatched = product.data.find(p => p._id === productDataId)
            setSpecs(productMatched.specification)
        })
        .catch(err=>console.log(err))
    },[ productDataId])

    /* Retrieving data from Review db */
    useEffect(()=>{
        axios.get('http://localhost:5000/reviews')
        .then( review => {
            // Find all review that share the same product id 
            const reviews = review.data.filter(r => r.productID === productDataId)
            setReviews(reviews)
        })
        .catch(err => console.log(err))
    },[productDataId]) // issue


    const tabs = [
        { label: 'Specifications', content:` Specifications: ${specs}`},
        { label: 'Reviews', content : reviews }
    ];
    // Pagnation
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2; 
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const numOfPages = Math.ceil(reviews.length/itemsPerPage);
    const reviewPosts = reviews.slice(firstIndex, lastIndex);
    
    useEffect(()=>{
        if(currentPage > numOfPages && numOfPages > 0){
            setCurrentPage(1)
        }
    },[currentPage, numOfPages])

    function nextPageBtn(){
        if(currentPage != numOfPages){
            setCurrentPage(currentPage + 1)
        }
    }
    function prevPageBtn(){
        if(currentPage != 1){
            setCurrentPage(currentPage - 1)
        }
    }
    return (
        <div>
            <ul>
                {tabs.map((tab, index) => (
                <button 
                    key={index} 
                    onClick={() => setActiveTab(index)} 
                    className={`tab-btn ${index === activeTab ? 'active' : '' }`}
                >
                    {tab.label}
                </button>
                ))}
            </ul>

            <div className="tabContent">
                {/* Specs*/}
                { activeTab === 0 && <p> {tabs[activeTab].content}</p> }
                {/* Reviews*/}
                 { activeTab === 1 && reviews.length > 0 &&
                    <div>
                        {reviewPosts.map( review =>(
                            <div className="review-container" key={review._id}>
                                <p className="username">{review.username}</p>
                                <StarRatingDisplay score = {review.rating}/>
                                <p className="review">"{review.review}"</p>
                            </div>
                        ))}
                        <div className = "pagination_container">
                            <div className = "navigation">
                                <button className="prevPageBtn"><i className="bi bi-caret-left-fill" onClick={prevPageBtn}></i></button>
                                    <p>{currentPage}</p>
                                    <i className="bi bi-slash-lg"></i>
                                    <p>{numOfPages}</p>
                                <button className="nextPageBtn"><i className="bi bi-caret-right-fill" onClick={nextPageBtn}></i></button>
                            </div>
                        </div>
                        
                    </div>  
                } 
                {activeTab === 1 && reviews.length === 0 && <p> No Reviews yet! Be the first! :D</p>}
            </div>
        </div>
    );
}
export default Tabs;