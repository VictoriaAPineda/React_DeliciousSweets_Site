import React, {useEffect, useState} from 'react'
// {images} = array of images to be loaded in the carousel
const Carousel = ({images, interval = 3000}) => {
        const [currentImage, setCurrentImage] = useState(0); // 1st image (index 0) displays by default

        const nextSlide = () => {
            /*  Reads: If the prevImageIndex is exactly eqaul last index of array, 
            **      then go to 0 index(1st image), 
            **      else go to next image (+1 on the index)
            */
            setCurrentImage((prevImageIndex)=> prevImageIndex === images.length - 1 ? 0 : prevImageIndex + 1);
        };
        const prevSlide = () => {
            setCurrentImage((prevImageIndex)=> prevImageIndex === 0 ? images.length -1 : prevImageIndex -1);
        };
        /*  Uses dot button index to set current image to be displayed
        **  in carousel
        */
        const goToSlide = (index) => {
            setCurrentImage(index);
        }
        useEffect(()=>{
            // Will call the nextSlide function automatically
            const autoPlayInterval = setInterval(nextSlide, interval);
            return() => {
                // removes the autoplay when component is unmounted
                clearInterval(autoPlayInterval);
            };
        },[interval]); // Occurs every 3 seconds
        
     return(
        <section className='carousel'>
            <div className='carousel_txt_container centered-txt'>
                <p className='large-font'>Delicious Savings</p>
                <button className='carousel_view_btn'>View</button>
            </div>
            {/* Image from array to be displayed */}
            <img src={images[currentImage]} className='carousel_img'/>
            {/* Prev / Next btns */}
            <div className='banner_btn_group'>
                <button onClick={prevSlide}  className="carousel_btn " ><i className="bi bi-chevron-left"></i></button>
                <button onClick ={nextSlide} className="carousel_btn "><i className="bi bi-chevron-right"></i></button>
            </div>
            {/* Dot btn navigation */}
            <CarouselDotIndicators 
                images={images}
                currentImageIndex ={currentImage} // ex: 1
                onClick={goToSlide}
            />
        </section>
    );
};
/* For each image, it has a key(based on it's array index)
** images - array of images
** currentImageIndex - index number of current image
** onClick - goToSlide function. Notes the dot's index (equal length to the images array) then sets 
**          corresponding image to be the current image.
*/
const CarouselDotIndicators = ({images, currentImageIndex, onClick}) =>{
    return(
        <div className='carousel_dot_indicators'>
            {images.map((_,index)=>(
                <span 
                    key={index} // dot btn's index number
                    className={`carousel_dot ${index === currentImageIndex ? 'active':''}`}  
                    onClick={() => onClick(index)}
                />
            ))}
        </div>
    )
}
export default Carousel;
