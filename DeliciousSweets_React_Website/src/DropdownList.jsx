import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';

function DropDownList(){

    const [data, setData] = useState([]) // State to hold the data retrieved from MongoDB
    const [uniqueCategory,setUniqueCategory] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then(product => { 
            // Sort data by category
            setData(product.data.sort((a,b) => (a.category > b.category) ? 1: -1))
        })
        .catch(err => console.log(err))
    },[])
    
    useEffect(()=>{
        // Return all instances of category property
        const properties = data.map((product=> {return product.category}))
        // Copies the object(propeties) into another a new object, Set makes it
        // so there are no duplicates
        const uniqueCategory = [...new Set(properties)]
        setUniqueCategory(uniqueCategory);
    },[data]) // updated if data is modified [addition of more categories]

    return(
        <ul>
            {
                // TODO: Each should tell products what to display
                uniqueCategory.map((category)=> (
                    <li className= 'dropdown-item'>
                        <Link to="/products" className="item">
                            <p key={category}>{category}</p>
                        </Link>
                    </li>
                ))
            }
        </ul>
        
    )
}
export default DropDownList;