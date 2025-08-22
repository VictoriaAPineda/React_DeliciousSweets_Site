import React, { useEffect, useState } from "react";
import StarRatingDisplay from "./starRatingDisplay";
import axios from "axios";
import StarSelection from "./StarSelection";

function Tabs({productDataId}){
    
    const [specs, setSpecs] = useState([]);
    const [reviews, setReviews] = useState([])
    const [activeTab, setActiveTab] = useState(0);// tab index 0 default
    const [reviewInput, setReviewInput] = useState('');
    const [userStarRating, setUserStarRating] = useState(0);
    const [usernameInput, setUserNameInput] = useState(''); // temp for tracking reviews, update to user id later on

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
    },[productDataId, reviews]) 


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
        // Close review view when switching tabs
        setIsVisible(false)
    },[activeTab])

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
        setReviewInput('');
        setUserNameInput('');
        setIsVisible(false);
        setUserStarRating(0);
    }
    function handleUserStarRating (value){
        setUserStarRating(value)
    }

    // Deleting from reviews
    const handleDeleteReview = async (reviewToDelete) => { 
        try {
            await axios.delete(`http://localhost:5000/reviews/${reviewToDelete.username}`)
            setReviews(reviews.filter((review) => review.username !== reviewToDelete.username))
        } catch (error) {
            console.log(error)
        }
    }

    /* TODO: 
    ** [ ] popup modal if nothing is entered but submitted
    ** [ ] only unique usernames allowed 
    */
    const handleReviewSubmit = async (e) =>{
        e.preventDefault();
        if(reviewInput !== ''){
            try {
                const productReview = {
                    review: reviewInput,
                    rating: userStarRating,
                    username: usernameInput,
                    productID: productDataId,
                }
                await axios.post('http://localhost:5000/reviews', productReview)
                .then(res => res.data)
                setReviewInput('');
                setUserNameInput('');
                setUserStarRating(0); // not restiing??
                setIsVisible(false)
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
                { activeTab === 0 && 
                    <div className="specs-card">
                        <p> {tabs[activeTab].content}</p>
                    </div> 
                }

                {/* Reviews of product */}
                 { activeTab === 1 && reviews.length > 0 &&
                    <div className="review-card">
                        {/* Add a review */}
                        <form action="#" method="POST" onSubmit={handleReviewSubmit} className="add-review-section">
                            {/* TODO?: Add filter ex: newest to oldest */}
                            {/* Add review btn*/}
                            <button className="add-review-btn" onClick={()=> handleShowReviewInput()} >Add Your Review</button>

                            { isVisible &&  
                                <div>
                                    {/* Retrieve the value of star rating from component */}
                                    <StarSelection onRatingSelection = {handleUserStarRating}/>
                                    {/* enter username */}
                                    <div>
                                        <label htmlFor="">Enter Username:</label>
                                        <input name= "username" value={usernameInput} onChange={(e)=> setUserNameInput(e.target.value)}/>
                                    </div>
                                    
                                    <textarea className="review-text-area" placeholder="Type your review here..." value={reviewInput
                                    } name="review-content" onChange={(e)=> setReviewInput(e.target.value)} id="" cols="30" rows="10"></textarea> 
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
                                <div>
                                    <p className="username">{review.username}</p>
                                    <StarRatingDisplay score = {review.rating}/>
                                    <p className="review">"{review.review}"</p>
                                </div>
                                <button className="del-review-btn" onClick={()=>handleDeleteReview(review)}>Delete Review</button>
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
                                    <StarSelection onRatingSelection = {handleUserStarRating}/>

                                    {/* enter username */}
                                    <div>
                                        <label htmlFor="">Enter Username:</label>
                                        <input name= "username" value={usernameInput} onChange={(e)=> setUserNameInput(e.target.value)}/>
                                    </div>

                                    <textarea className="review-text-area" placeholder="Type your review here..." value={reviewInput
                                    } name="review-content" onChange={(e)=> setReviewInput(e.target.value)} id="" cols="30" rows="10"></textarea> 
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