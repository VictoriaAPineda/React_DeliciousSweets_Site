import { useContext, useEffect, useState } from 'react';
import cardIcon from '/src/images/cardIcon.png';
import timeIcon from '/src/images/clock.png';
import truckIcon from '/src/images/delivery_truck.png';
import phoneIcon from '/src/images/telephone.png';
import CartContext, { Cart } from "../contextAPI/CartContext";
import axios from 'axios';

function UserCart(){
    const [cartItems, setCartItems] = useState([])
    const {cart, setCart} = useContext(Cart);
    
    // Use cart data to load up data from Products by the productID provided
    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then( item => {
            // Obtain the product's ids from cart 
            const idArr = cart.map(i => i.itemId)
            // Match the ids against the ids in Products db
            setCartItems(item.data.filter( items => idArr.includes(items._id)))
        })
        .catch(err => console.log(err))
    }, [cart])

   // Calc total cost
    const calcTotalCartCost = () => {
        let total =  0;
        // For each of the items in the cart
        cartItems.forEach( item =>{
            // macth the ids to find price in product db
            const matchingQuantity = cart.find( q => q.itemId === item._id)
            if(matchingQuantity){
                total += item.price * matchingQuantity.itemQuantity
            }
        })
        return total.toFixed(2)
    }

    // Calc total per item
    const itemCost = (item) =>{
        let total = 0
        const quanitityFound =  cart.find( i=> i.itemId === item._id)
        if(quanitityFound){
            total = item.price * quanitityFound.itemQuantity
        }
        return total.toFixed(2)
    }

    // display quantity in input 
    const displayQuantity = (item) =>{
        const quanitityFound =  cart.find( i=> i.itemId === item._id)
        if(quanitityFound){
            return quanitityFound.itemQuantity
        }
    }
    // user changes to quantity of a specific item
    const handleCartItemQuantity = (event, item) => {
        const newQuantity = parseInt(event.target.value)
        
        setCart( prevCart => prevCart.map(i =>{
            if(i.itemId === item._id){
                return {...i, itemQuantity: newQuantity}
            }
        }))

    }
    // console.log(cart)
    // TODO: delete btn
    // TODO: decimal places in cost, rounding bounds 
    // TODO: adjust css for input field of item quantity
    // ERROR: add to cart of detail not clearing aftr nav to anothr page [done]

    return(
        <>

            <section id="cart-page-container">
    
                <div className="cart-order-container">
                    <p className="motto">Your Cart of Deliciousness</p>
                    <div className="row-align">
                        <div className="order-details-container">
                        
                            <div id="title-order-grid-container">
                                <p className="item-col-title">Item</p>
                                <p className="price-col-title">Price</p>
                                <p className="quantity-col-title">Qty.</p>
                                <p className="total-col-title">Item's Total</p>
                            </div>

                            {cartItems.map((item)=>(
                                <div className="order" key={item._id}>
                                    <div className="product-data">
                                        <p>{item.image}</p>
                                        <p>{item.name}</p>
                                    </div>
                                    <p className="price-data">${item.price}</p>
                                    <input className="qty-data" defaultValue = {displayQuantity(item)} onChange={(e)=>handleCartItemQuantity(e, item)}type="number" min={'1'}/>
                                    <p className="total-data">${itemCost(item)}</p>
                                    <button className="del-btn">X</button>
                                </div>
                            ))}
                            
                        </div>

                        {/* Customer order form input */}
                        <div className="customer-details-container">
                            <div className="order-summary-container">
                                <p className='orderSum_header'>Order Summary</p>
                                <div>
                                    <div className="subtotal"> 
                                        <p>Subtotal</p>
                                        <p>$12.00</p>
                                    </div>
                                    <div className="tax">
                                        <p>Tax</p>
                                        <p>$1.00</p>
                                    </div>
                                    <div className="total">
                                        <p>Total Order</p>
                                        <p>${calcTotalCartCost()}</p>
                                    </div>
                                </div>
                               
                            </div>
                            <div className='order-contact-container'>
                                <div className="contact_header">
                                    <p>Contact</p>
                                </div>
                         
                                <input type="text" placeholder='First Name'/>
                                <input type='text' placeholder='Last Name'/>
                                <input type="email" placeholder='Email'/>
                                <input type="text" placeholder='Phone Number'/>
                            </div>

                            <div className="payment-container">
                                <div className='payment_header'> 
                                    <p>Payment</p> 
                                    <img className='cardIcon' src={cardIcon}></img>
                                </div>

                                <div className="cardInfo-container">
                                    <p>Card Information</p>
                                    <div className="card-input-container">
                                        <input type="text" placeholder='Card Number'/>
                                        <div>
                                            <input type='text' placeholder='MM / YY'/>
                                            <input type="text" maxLength={3} placeholder='CVC'/>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-method-container">
                                    <div className="time_header">
                                        <p>Pick Up Time</p>
                                        <img className='timeIcon' src={timeIcon}></img>
                                    </div>
                                   
                                    <input type="date"/>
                                    <input type="time" name="" id="" min="" max=""/>
                                    <p>OR</p>
                                    <div className="delivery_header">
                                        <p>Delivery</p>
                                        <img className='truckIcon' src={truckIcon}></img>
                                    </div>
                                    
                                    <label htmlFor="">Address</label>
                                    <input type="text" />
                                    <p className="deliveryNote">* Note: Will only make deliveries within a 15 mile radius</p>
                                </div>

                                <button className='order-btn'>Place Order</button>

                                <div className='assistance_contact'>
                                    <p>Need Assistance?</p>
                                    <div className="phoneContact">
                                        <img className="phoneIcon" src={phoneIcon}></img>
                                        <p>555-555-5555</p>
                                </div>
                               
                                </div>
                            
                            </div>
                        </div>
                    </div>
                   
                </div>

            </section>



       
        </>
    )
}
export default UserCart;