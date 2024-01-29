import React, {useEffect, useState} from 'react'
// {images} = array of images to be loaded in the carousel
const Carousel = ({images, interval = 3000}) => {
        const [currentImage, setCurrentImage] = useState(0);

        const nextSlide = () => {
            /*  Reads: If the prevImageIndex is exactly eqaul last index, 
            **      then go to 0 index(1st image), 
            **      else go to next image (+1 on the index)
            */
            setCurrentImage((prevImageIndex)=> prevImageIndex === images.length - 1 ? 0 : prevImageIndex + 1);
        };
        const prevSlide = () => {
            setCurrentImage((prevImageIndex)=> prevImageIndex === 0 ? images.length -1 : prevImageIndex -1);
        };

        useEffect(()=>{
            // Will call the nextSlide function 
            // Interval is set to 3000ms/3secs
            const autoPlayInterval = setInterval(nextSlide, interval);
            return() => {
                // removes the autoplay when component is unmounted
                clearInterval(autoPlayInterval);
            };
        },[interval]);
        

     return(
        <section className='carousel'>
            <div className='carousel_txt_container centered-txt'>
                <p className='large-font'>Delicious Savings</p>
                <button className='carousel_view_btn'>View</button>
            </div>
            <img src={images[currentImage]} className='carousel_img'/>
            <div className='banner_btn_group'>
                <button onClick={prevSlide}  className="carousel_btn"><i class="bi bi-chevron-left"></i></button>
                <button onClick ={nextSlide} className="carousel_btn"><i class="bi bi-chevron-right"></i></button>
            </div>
           
        </section>
    );
};
export default Carousel;
