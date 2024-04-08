import React from "react";

export default function Product(props){
    return(
        <div className='carouselCard'>
            <img className='cardImg' src={props.image}/>
            <div className='cardInfo'>
                <p>{props.name}</p>
            </div>
        </div>
    )
}