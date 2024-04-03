import React from "react";
import defaultCardImg from "/src/images/honeycake.jpg"

export default function Product(){
    return(
        <div className='carouselCard'>
            <img className='cardImg' src={defaultCardImg}/>
            <div className='cardInfo'>
                <p>Proudct Name</p>
            </div>
        </div>
    )
}