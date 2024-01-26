import React, {useState} from 'react'

export default function BannerSpecial(){

    // {images} = array of images to be loaded in the carousel
    const Carousel = ({images}) => {
        const [currentImage, setCurrentImage] = useState(0);

        const nextSlide = () => {
            /*  Reads: If the prevImageIndex is eactly eqaul last index (index count starts at 0 so - 1), 
            **      then go to 0 index(1st image), 
            **      else go to next image (+1 on the index)
            */
            setCurrentImage((prevImageIndex)=> prevImageIndex === images.length - 1 ? 0 : prevImageIndex + 1);
        };
        const prevSlide = () => {
            setCurrentImage((prevImageIndex)=> prevImageIndex === 0 ? images.length -1 : prevImageIndex -1);
        };

    };
    return(
        <>
            <section className='carousel'>
            {/* onClick={prevSlide} */}
                <button  className="carousel_btn">Prev</button>
                <img src='{images[currentImage]}' className='carousel_img'/>
                <button className="carousel_btn">Next</button>
                
            </section>
        </>
   
    
    );
};