import cardIcon from '/src/images/cardIcon.png';

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
                                <p>Order Summary</p>
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
                                        <p>Total</p>
                                        <p>$13.00</p>
                                    </div>
                                </div>
                               
                            </div>

                            <div className="payment-container">
                                <div className='payment_header'> 
                                    <p>Payment</p> 
                                    <img className='cardIcon' src={cardIcon}></img>
                                </div>
                               
                                <label htmlFor="">First and Last Name</label>
                                <input type="text" />
                                <label htmlFor="">Email Address</label>
                                <input type="email" />
                                <label htmlFor="">Phone Number</label>
                                <input type="text" />

                                <div className="cardPay-container">
                                    
                                    <p>Credit Card</p>
                                    <p>Card Number</p>
                                    <input type="text"/>
                                    
                                    <p>Expiration Date</p>
                                    <select name="" id="">
                                        <option value=""></option>
                                    </select>
                                    <select name="" id="">
                                        <option value=""></option>
                                    </select>
                                    <p>Security Code</p>
                                    <input type="text" maxLength={3} />
                                </div>

                                <div className="order-method-container">
                                    <p>Pick Up Time</p>
                                    <input type="time" name="" id="" min="" max=""/>
                                    <p>OR</p>
                                    <p>Delivery</p>
                                    <label htmlFor="">Address</label>
                                    <input type="text" />
                                    <p className="deliveryNote">* Note: Will only make deliveries within a 15 mile radius</p>
                                </div>

                                <button>Place Order</button>
                                <p>Need Assistance?</p>
                                <p>555-555-5555</p>
                            </div>
                        </div>
                    </div>
                   
                </div>

            </section>



       
        </>
    )
}
export default Cart;