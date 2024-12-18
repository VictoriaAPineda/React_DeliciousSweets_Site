import React, { useState } from "react";

function Tabs(){
    const [activeTab, setActiveTab] = useState(0);// tab index 0 default

    {/* Notes:  testing functionality 
    TODO: 
    make mockup data in db
    Each reveiw will be its own obj in a array of objects from the db 
    data brough in will be based on product id
    */}

    const tabs = [
        { label: 'Specifications', content: 'Specifications: [link up to product id specs]' },
        { label: 'Reviews', content :[ 
            { uid: 123, name: "deb", review: "review 01", rating: 4 ,id: "product id: 00"}, 
            { uid: 345, name: "bob", review: "review 02", rating: 1 ,id: "product id: 00"}, 
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
                {/* Loop through reviews...
                TODO: Create mock data. Limit to 5 reviews per page? Mini pagnation
                Order by highest to least (rating number)*/}
                 { activeTab === 1 && 
                    <div>
                        {tabs[1].content.map( i =>(
                        <div key={i.uid}>
                            <h2>{i.uid}</h2>
                            <h1>{i.name}</h1>
                        </div>
                        ))}
                    </div>       
                } 
            </div>
        </div>
    );
}
export default Tabs;
