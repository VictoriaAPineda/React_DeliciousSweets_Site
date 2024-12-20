import React, { useState } from "react";
import StarRatingDisplay from "./starRatingDisplay";

function Tabs(){
    const [activeTab, setActiveTab] = useState(0);// tab index 0 default

    {/* Notes:  testing functionality 
    TODO: 
    make mockup data in db
    Each reveiw will be its own obj in a array of objects from the db 
    data brough in will be based on product id
    */}
    const tabs = [
        { label: 'Specifications', content: 'Specifications:  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget neque imperdiet, mollis ipsum at, iaculis nunc. Curabitur ut interdum ipsum, eget tempor est. Donec lectus turpis, congue quis enim ac, pulvinar semper nulla. Mauris in scelerisque sapien. Pellentesque eget dolor mauris. Duis molestie odio ut interdum rhoncus. Etiam lacinia elementum blandit. Nulla sed ex nisi. Vivamus eu eros sollicitudin, hendrerit lorem ac, elementum felis.' },
        { label: 'Reviews', content :[ 
            { uid: 123, name: "debLefor123", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor, erat id vestibulum finibus, ante ante rutrum velit, at tincidunt enim odio nec purus. Vestibulum nisl dolor, tincidunt eleifend mauris id, porta malesuada magna. Proin id lectus sodales, gravida arcu eget, gravida tortor. Etiam laoreet ornare nunc eget gravida. Fusce blandit mattis ipsum sit amet viverra. In nibh justo, iaculis nec odio eu, ornare rhoncus ipsum. Donec id tempus dolor.", rating: 4 ,id: "product id: 00"}, 
            { uid: 345, name: "bobRiley345", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor, erat id vestibulum finibus, ante ante rutrum velit, at tincidunt enim odio nec purus. Vestibulum nisl dolor, tincidunt eleifend mauris id, porta malesuada magna. Proin id lectus sodales, gravida arcu eget, gravida tortor. Etiam laoreet ornare nunc eget gravida. Fusce blandit mattis ipsum sit amet viverra. In nibh justo, iaculis nec odio eu, ornare rhoncus ipsum. Donec id tempus dolor.", rating: 1.5 ,id: "product id: 00"}, 
        ]}
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
                {/* 
                    TODOS: Create mock data. Limit to 5 reviews per page? 
                    Mini pagnation
                    Order by highest to least (rating number)
                    ratings be displayed out of 5 stars
                */}
                 { activeTab === 1 && 
                    <div>
                        {tabs[1].content.map( review =>(
                        <div className="review-container" key={review.uid}>
                            <p className="username">{review.name}</p>
                            <StarRatingDisplay score = {review.rating}/>
                            <p className="review">"{review.review}"</p>
                        </div>
                        ))}
                    </div>       
                } 
            </div>
        </div>
    );
}
export default Tabs;
