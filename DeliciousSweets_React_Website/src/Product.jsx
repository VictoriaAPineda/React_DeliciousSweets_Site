import React from "react";

export default function Product(props){
    return(
        // TODO: Use Id to link to a products detail page in the carousel
        <div className='carouselCard'>
            <img className='cardImg' src={props.image}/>
            <div className='cardInfo'>
                <p>{props.name}</p>
            </div>
        </div>
    )
}