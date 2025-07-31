import { useState } from "react"
/* 
** User can hover over stars, on click the value (1-5)
** will be returned to be saved into the user's review
*/
export default function StarSelection ({onRatingSelection}){

    // Array with 5 elements (0 - placeholder)
    const starArrayMax = new Array(5).fill(0);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (value) =>{
        onRatingSelection(value)
        setRating(value)
    }
    // Stars fill over moouse hover 
    const handleMouseEnter = (value) => {
        setHoverRating(value);
    }
    const handleMouseLeave = () => {
        setHoverRating(0)
    }
    return(
        <>
            <div className="stars-row">
                <p> Rating: </p>
                {starArrayMax.map((_,index) => {
                    const starValue =  index + 1; // starts at 1 not 0 index
                    // Tracks visual filling of stars (either by hover/click )
                    const displayValue = hoverRating || rating;
                    const fullStar = displayValue >= starValue;

                    return(
                        <div
                            key={index}
                            value = {rating}
                            className={`bi ${fullStar ? 'bi-star-fill' :'bi-star'}`}
                            onChange={(e) => setRating(e.target.value)}
                            onClick={()=> handleStarClick(starValue)}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onMouseLeave={() => handleMouseLeave}
                        >
                        </div>
                    )
                })}

            </div>
        </>
    )
}