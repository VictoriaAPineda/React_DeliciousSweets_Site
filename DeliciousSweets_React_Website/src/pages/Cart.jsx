import cardIcon from '/src/images/cardIcon.png';
import timeIcon from '/src/images/clock.png';
import truckIcon from '/src/images/delivery_truck.png';
import phoneIcon from '/src/images/telephone.png';

function Cart(){
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
                                <p className="total-col-title">Total</p>
                            </div>
        
                            <div className="order">
                                <div className="product-data">
                                    <p>[IMG]</p>
                                    <p>Name of Product</p>
                                </div>
                                <p className="price-data">$19.99</p>
                                <input className="qty-data" type="number" min={'1'}/>
                                <p className="total-data">$19.99</p>
                                <button className="del-btn">X</button>
                            </div>
                            <div className="order">
                                <div className="product-data">
                                    <p>[IMG]</p>
                                    <p>Name of Product</p>
                                </div>
                                <p className="price-data">$19.99</p>
                                <input className="qty-data" type="number" min={'1'}/>
                                <p className="total-data">$19.99</p>
                                <button className="del-btn">X</button>
                            </div>
                            <div className="order">
                                <div className="product-data">
                                    <p>[IMG]</p>
                                    <p>Name of Product</p>
                                </div>
                                <p className="price-data">$19.99</p>
                                <input className="qty-data" type="number" min={'1'}/>
                                <p className="total-data">$19.99</p>
                                <button className="del-btn">X</button>
                            </div>
          
                            
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
                                        <p>$13.00</p>
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
                                
                                <p>Need Assistance?</p>
                                <div className="phoneContact">
                                    <img class="phoneIcon" src={phoneIcon}></img>
                                    <p>555-555-5555</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                   
                </div>

            </section>



       
        </>
    )
}
export default Cart;