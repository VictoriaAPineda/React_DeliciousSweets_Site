import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import defaultCardImg from "/src/images/honeycake.jpg"

export default function MultiCarousel(){
    const responsive = {
        /* TODO: Make adjustments */
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return(
        <>
            {/*TODO: Styling cards. Temp data, later fill with objects from database */}
            <div className='productsCarousel-container'>
                <Carousel responsive={responsive}>
                    <div className='carouselCard'>
                        <img src={defaultCardImg}></img>
                    </div>
                    <div>
                        <img src={defaultCardImg}></img>
                    </div>
                    <div>
                        <img src={defaultCardImg}></img>
                    </div>
                    <div>
                        <img src={defaultCardImg}></img>
                    </div>
                </Carousel>
            </div>
        </>
    )
}