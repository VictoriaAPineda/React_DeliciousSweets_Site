import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';
import { productData, responsive } from './data';

export default function MultiCarousel(){

    const product = productData.map(item =>(
      <Product 
        name={item.name} 
        image={item.image}
      />
    ));

    return(
        <>
            <div className='productsCarousel-container'>
                <Carousel responsive={responsive}>
                  {product}
                </Carousel>
            </div>
        </>
    )
}