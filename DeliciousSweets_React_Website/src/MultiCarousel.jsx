import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Product from './Product';

export default function MultiCarousel(){
    const responsive = {
        /* TODO: Make adjustments */
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1250 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1250, min: 900 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 900, min: 750 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 750, min: 0 },
          items: 1
        }
      };
    return(
        <>
            {/*TODO: Styling cards. Temp data, later fill with objects from database */}
            <div className='productsCarousel-container'>
                <Carousel responsive={responsive}>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
             
                </Carousel>
            </div>
        </>
    )
}