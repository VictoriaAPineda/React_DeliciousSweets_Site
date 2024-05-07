

function Cart(){
    return(
        <>

            <section id="cart-page-container">
            <p>Your Cart of Deliciousness</p>
                <div className="cart-order-container">
                   
                    <div className="order-details-container">
                        {/*grid 6 cols (last for delete btn)*/}
                        <div id="order-grid-container">
                            <div className="col-titles">
                                <p>Item</p>
                                <p>Price</p>
                                <p>Qty.</p>
                                <p>Total</p>
                            </div>
                     
                        <div className="orders">
                              <div className="order">

                                <div>
                                    <p>[IMG]</p>
                                    <p>Name of Product</p>
                                </div>

                                <p>$19.99</p>

                                <input type="number"/>

                                <p>$19.99</p>

                                <button>X</button>

                                
                            </div>
                            <div className="order">

                                <div>
                                    <p>[IMG]</p>
                                    <p>Name of Product</p>
                                </div>

                                <p>$19.99</p>

                                <input type="number"/>

                                <p>$19.99</p>

                                <button>X</button>

                                
                            </div>
                        </div>
                          
                        </div>

                    </div>

                    <div className="customer-details-container">
                        <div className="order-summary-container">
                            <p>Order Summary</p>
                            <p>Subtotal</p><div className="subtotal">$12.00</div>
                            <p>Tax</p><div className="tax">$1.00</div>
                        </div>

                        <div className="payment-container">
                            <label htmlFor="">First and Last Name</label>
                            <input type="text" />
                            <label htmlFor="">Email Address</label>
                            <input type="email" />
                            <label htmlFor="">Phone Number</label>
                            <input type="text" />

                            <div className="cardPay-container">
                                <button type="radio"></button>
                                <p>Credit Card</p>
                                <button type="radio"></button>
                                <p>PayPal</p>

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
                                <p>* Note: Will only make deliveries within a 15 mile radius</p>
                            </div>

                            <button>Place Order</button>
                            <p>Need Assistance?</p>
                            <p>555-555-5555</p>
                        </div>
                    </div>
                </div>

            </section>



       
        </>
    )
}
export default Cart;