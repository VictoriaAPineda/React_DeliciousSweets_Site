

export default function StarRatingDisplay({score}){
    const maxStars = 5;
  
    // break down the score inputted
    const fullStar = Math.floor(score) // holds how many full stars
    const halfStar = score % 1 !== 0 // holds the half star if any
    const starArr = [] // holds the resulting star display

    // [1] - Adds on the calculated full stars
    // A for loop cause there can be multiple full stars
    for(let i = 0; i < fullStar; i++){
        starArr.push(<i key={i} className="bi bi-star-fill"></i>)
    }
    // [2] - Adds on the calculated half star (if any)
    // if statement as there can be only 1 half star
    if(halfStar){
        starArr.push(<i className="bi bi-star-half"></i>)
    }
    // [3] - Construct the star output
    // each half start counts as "one star"
    for(let i = fullStar + (halfStar ? 1 : 0); i < maxStars; i++){
        // Fills up rest of array with empty stars
        starArr.push(<i className="bi bi-star"></i>)
    }
    return starArr
}

