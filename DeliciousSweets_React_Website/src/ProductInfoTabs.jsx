import React, { useEffect, useState } from "react";
import StarRatingDisplay from "./starRatingDisplay";
import axios from "axios";

function Tabs({productDataId}){
    
    const [specs, setSpecs] = useState([]);
    const [reviews, setReviews] = useState([])
    const [activeTab, setActiveTab] = useState(0);// tab index 0 default
    const [reviewData, setReviewData] = useState('');

    const [isVisible, setIsVisible] = useState(false);

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
    },[productDataId]) 


    const tabs = [
        { label: 'Specifications', content:` Specifications: ${specs}`},
        { label: 'Reviews', content : reviews }
    ];
    // Pagnation
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2; // How many reviews to show per page
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

    function handleShowReviewInput(){
        setIsVisible(true);
    }
    function handleCloseReviewInput(){
        setReviewData('');
        setIsVisible(false);
    }

    /* TODO: 
    [1] add star review selection, 
    [2] username later when I can implement users */
    const handleReviewSubmit = async (e) =>{
        e.preventDefault();
        if(reviewData !== ''){
            try {
                const productReview = {
                    review: reviewData,
                    rating: 5,
                    username: 'Username Here',
                    productID: productDataId,
                }
                console.log(productReview)
                await axios.post('http://localhost:5000/reviews', productReview)
                .then(res => res.data)
                setReviewData('')
                window.location.reload(true);
            } catch (error) {
                console.log(error)
            }
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
                {/* Specifications of product */}
                { activeTab === 0 && <p> {tabs[activeTab].content}</p> }

                {/* Reviews of product */}
                 { activeTab === 1 && reviews.length > 0 &&
                    <div>
                        {/* Add a review */}
                        <form action="#" method="POST" onSubmit={handleReviewSubmit} className="add-review-section">
                            <button className="add-review-btn" onClick={()=> handleShowReviewInput()} >Add Your Review</button>
                            { isVisible &&  
                                <div>
                                    <textarea className="review-text-area" placeholder="Type your review here..." value={reviewData
                                    } name="review-content" onChange={(e)=> setReviewData(e.target.value)} id="" cols="30" rows="10"></textarea> 
                                    <div>
                                        <button type="submit" className="add-review-btn">Submit</button>
                                        <button className="add-review-btn" onClick={()=>handleCloseReviewInput()} >Close</button>
                                    </div>
                                </div>
                            }
                        </form>
                        {/* Reviews array */}
                        {reviewPosts.map( review =>(
                            <div className="review-container" key={review._id}>
                                <p className="username">{review.username}</p>
                                <StarRatingDisplay score = {review.rating}/>
                                <p className="review">"{review.review}"</p>
                            </div>
                        ))}
                        {/* navigation for reviews */}
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

                {/* View if a products doesn't have reviews yet */}
                {activeTab === 1 && reviews.length === 0 && 
                    <div>
                        {/* Add a review */}
                        <form action="#" method="POST" onSubmit={handleReviewSubmit} className="add-review-section">
                            <button className="add-review-btn" onClick={()=> handleShowReviewInput()} >Add Your Review</button>
                            { isVisible &&  
                                <div>
                                    <textarea className="review-text-area" placeholder="Type your review here..." value={reviewData
                                    } name="review-content" onChange={(e)=> setReviewData(e.target.value)} id="" cols="30" rows="10"></textarea> 
                                    <div>
                                        <button type="submit" className="add-review-btn">Submit</button>
                                        <button className="add-review-btn" onClick={()=>handleCloseReviewInput()} >Close</button>
                                    </div>
                                </div>
                            }
                        </form>
                        <p> No Reviews yet! Be the first! :D</p>
                    </div>
                }
            </div>
        </div>
    );
}
export default Tabs;