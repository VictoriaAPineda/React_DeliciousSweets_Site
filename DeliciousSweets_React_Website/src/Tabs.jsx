import React, { useEffect, useRef, useState } from "react";
import StarRatingDisplay from "./starRatingDisplay";
import axios from "axios";
import Pagination from "./Pagination";

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
    },[productDataId, activeTab])

    const tabs = [
        { label: 'Specifications', content:` Specifications: ${specs}`},
        { label: 'Reviews', content : reviews }
    ];

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
                 { activeTab === 1 && 
                    <div>
                        {reviews.map( review =>(
                            <div className="review-container" key={review._id}>
                                <p className="username">{review.username}</p>
                                <StarRatingDisplay score = {review.rating}/>
                                <p className="review">"{review.review}"</p>
                            </div>
                        ))}
                        <Pagination 
                            itemsData = {reviews}
                            perPageLimit = {3}
                            setPageItems = {setReviews}
                        />     
                    </div>  
                
                } 
            </div>
        </div>
    );
}
export default Tabs;
