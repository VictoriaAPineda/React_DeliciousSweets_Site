import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';
import { responsive } from './CarouselResponsive';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MultiCarousel({productCategory, moveScreenToTarget}){
 
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

    const moveDisplayUp = () =>{
      moveScreenToTarget.current.scrollIntoView();
    }

    // Display other products in carousel within the same category of the selected product
    // Move screen to view product upon selection
    const product = filteredData.map(item =>(
        <Link to={`/productDetails/${item._id}`} onClick={moveDisplayUp}>
          <Product 
            key = {item.id}
            name={item.name} 
            image={item.image}
            id ={item._id}
          />
        </Link>
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