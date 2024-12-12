import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';
import { responsive } from './data';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MultiCarousel({productCategory}){
 
    const [filteredData, setFilteredData] = useState([])
    const [data, setData] = useState([]);

    // Retrieve data from the Products collection 
    useEffect(()=>{
      axios.get('http://localhost:5000/products')
      .then( product => {
        // Sort data by name
        setData(product.data.sort((a,b) => (a.name > b.name) ? 1: -1))
        // Filter 
        setFilteredData(product.data.filter(p=>p.category === productCategory)) 
      })
      .catch(err=> console.log(err))
    },[productCategory])

    // Display other products in carousel within the same category of the selected product
    // TODO: Adjust Carousel to align smaller inventory display (center?)

    const product = filteredData.map(item =>(
        <Product 
          name={item.name} 
          image={item.image}
          id ={item._id}
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