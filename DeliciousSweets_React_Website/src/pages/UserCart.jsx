import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cardIcon from '/src/images/cardIcon.png';
import timeIcon from '/src/images/clock.png';
import truckIcon from '/src/images/delivery_truck.png';
import phoneIcon from '/src/images/telephone.png';
import { Cart } from "../contextAPI/CartContext";
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ErrorModal from '../modals/ErrorModal'
import NotifModal from '../modals/NotifModal'
import Receipt from './Receipt'

function UserCart(){
    const [cartItemsData, setcartItemsData] = useState([])
    const {cart, setCart} = useContext(Cart);
    const [isCartEmpty, setIsCartEmpty] = useState(false)
    // const [isOrderSuccessful, setIsOrderSuccessful] = useState(false)
    const navigate = useNavigate()
    const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  
    // Initial values for form 
    const initalState = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        ccn: "",
        ccExpireDate: "",
        ccVerify: "",
        address: "", 
        selectedOptionBtn: "pickup",
        dateInputPickup: new Date().toLocaleDateString(),
        timeInputPickup:"",
        dateInputDelivery: "",
        timeInputDelivery: "",
        isPickupDateDisabled: false,
        isPickupTimeDisabled: false,
        isDeliveryDateDisabled: true,
        isDeliveryTimeDisabled: true,
        isDeliveryAddressDisabled: true,
        isEmailValid: false,
    }
    const [state, dispatch] = useReducer(OrderFormReducer, initalState)

    // Use cart data to load up data from Products by the productID provided
    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then( item => {
            // Obtain the product's ids from cart 
            const idArr = cart.map(i => i.itemId)
            // Match the ids against the ids in Products db
            setcartItemsData(item.data.filter( items => idArr.includes(items._id)))
        })
        .catch(err => console.log(err))
    }, [cart])
    // Combine cart and cartItemsData into a array to add on the quanitity for easier accessing
    const cartItemMergedData = cartItemsData.map((item) =>{
        let itemObject = cart.find( item2 => item2.itemId === item._id)
        // If the item is found (true) then add it to the combined array along with its properties
        return itemObject ? {...item, ...itemObject} : item
    })

    localStorage.setItem('UserCart', JSON.stringify(cartItemMergedData));

    // console.log("cartmergeddata")
    // console.log (cartItemMergedData) // use to for order cart model

    // Calc sub total cost of whole cart
    const calcSubTotalCartCost = () => {
        let subtotal = cartItemMergedData.reduce((acc, item) => acc + (item.price * item.itemQuantity), 0);
        let subtotalRounded = subtotal.toFixed(2);
        localStorage.setItem('CartSubtotal', subtotalRounded)
        return subtotalRounded;
    }
    // sales tax
    const calcSalesTax = () => {
        let totalTax = calcSubTotalCartCost() * 0.0825;
        let totalTaxRounded = totalTax.toFixed(2);
        localStorage.setItem('CartTax', totalTaxRounded);
        return totalTaxRounded;
    }
    // Calc an item's total
    const itemCost = (item) =>{
        let total = 0;
        total = item.price * item.itemQuantity
        return total.toFixed(2)
    }
    // Shipping fee
    const calcDelivery = () =>{
        if(state.selectedOptionBtn === 'pickup'){
            let fee = 0.00
            let feeRounded = fee.toFixed(2)
            localStorage.setItem('Shipping', feeRounded)
            return feeRounded;
        } else{
            // Realistically calc distance here, but will use flat fee here
            let fee = 8.00
            let feeRounded = fee.toFixed(2)
            localStorage.setItem('Shipping', feeRounded)
            return feeRounded;
        }
    }
    // cart total cost
    const calcTotalCost = () => {

        let totalCost =  parseFloat(calcSubTotalCartCost()) + parseFloat(calcSalesTax()) + parseInt(calcDelivery());
        let roundedTotalCost = totalCost.toFixed(2)
        localStorage.setItem('CartTotal', JSON.stringify(roundedTotalCost)); 
        // TODO: add shipping if applicable
        return roundedTotalCost
    }
    // User's changes to quantity of a specific item
    const handleCartItemQuantity = (event, itemToChange) => {
        // Grab the user's input value
        const newQuantity = parseInt(event.target.value)

        setCart((prevCart) => {
                const updatedCart = prevCart.map((item) =>{
                    if(item.itemId === itemToChange._id){
                        // Changes the object's quantity property value, keeps all else same
                        return {...item, itemQuantity :  newQuantity}
                    }
                    return item
                })
                // When quantity reaches 0 removes from cart
                return updatedCart.filter((item) => item.itemQuantity > 0)
            }            
        )
    }
    // delete item from cart
    const handleDeleteItem = (itemToDel) => {
        const updateCart = cart.filter((item) => item.itemId  !== itemToDel._id)
        setCart(updateCart)
    };

     // Reducer function to handle all the form data
    function OrderFormReducer (state, action) {
    // console.log('Previous State:', state);
    // console.log('Action:', action);
    switch (action.type) {
        /* Handles radio btn group interaction
        *   On switch, the unselected radio btn group fields:
        *   1) Should be cleared of data 
        *   2) Fields be disabled
        */
        case 'Method_Selected':
            if(action.payload === 'pickup'){
                return{
                    ...state, 
                    selectedOptionBtn:  action.payload,
                    isPickupDateDisabled: false,
                    isDeliveryDateDisabled: true,
                    dateInputDelivery: '',
                    isDeliveryTimeDisabled: true,
                    isPickupTimeDisabled: false,
                    timeInputDelivery: '',
                    isDeliveryAddressDisabled: true,
                    address: '',
                }
            }
            if( action.payload === 'delivery'){
                return{
                    ...state, 
                    selectedOptionBtn:  action.payload,
                    isPickupDateDisabled: true,
                    isDeliveryDateDisabled: false,
                    dateInputPickup: '',
                    isPickupTimeDisabled: true,
                    isDeliveryTimeDisabled: false,
                    timeInputPickup: '', 
                    isDeliveryAddressDisabled: false,
                }
            }
            
        case 'Text_Name_Changed':
            return{
                ...state, 
                /* [action.name] to handle more than one input field, due to both
                ** having save regex conditions. Saves from writing a seperate case.
                ** Using name attribute to differtiate between them (2) and 
                ** update/set each one's own value based on name attribute.
                */
                [action.name]: action.value
            };
        case 'Email_Set':
            return{
                ...state,
                email: action.emailInputted
            };
        case 'Validate_Email':
            return{
                ...state,
                isEmailValid : action.payload
            }
        case 'Phone_Set':
            return{
                ...state,
                //[action.name]: action.value
                phone: action.phoneInputted
            };
        case 'Card_Number_Set':
            return{
                ...state,
                ccn: action.cardNumberInputted
            };
        case 'Card_Expired_Date_Set':
            return{
                ...state,
                ccExpireDate: action.expDateInputted
            };
        case 'Card_Pin_Set':
            return{
                ...state,
                [action.name]: action.value
            };

        case 'Date_Pickup_Selected': 
            return{
                ...state, 
                dateInputPickup: action.payload
            };
        case 'Date_Delivery_Selected':
            return{
                ...state,
                dateInputDelivery: action.payload
            }
        case 'Time_Pickup_Selected':
            return{
                ...state, 
                timeInputPickup: action.payload
            }
        case 'Time_Delivery_Selected':
            return{
                ...state,
                timeInputDelivery: action.payload
            }
        case 'Delivery_Address_Set':
            return{
                ...state, 
                [action.name]:action.value
            }
        case 'Form_Cleared':
            return {initalState}
        default:
            return state
        }
    }

    // -- Handles and Dispatches for the OrderFormReducer ---

    const handleOrderRadioBtn = (e) => {
        dispatch({
            type: 'Method_Selected', 
            name: e.target.value
        })
    }
    const handleNameInputChange = (e) => {
        // Allows only letter to be typed 
        const nameRegex = /^[a-zA-Z]*$/g;
        const regexResult = nameRegex.test(e.target.value);
        if(regexResult){
            dispatch({
                type: 'Text_Name_Changed',
                name: e.target.name, // name attribute's value
                value: e.target.value // value attribute's value
            })
        }
    }
    /* 
    **  Will wait till user has finished typing email in input 
    **  BEFORE checking/validatin their input, 
    **  rather than user having to submit for a result
    */
    const timeoutRef = useRef(null)
    useEffect(()=>{
        // clearTimeout(timeoutRef.current);
        timeoutRef.current =  setTimeout(()=>{
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            const regexResult = emailRegex.test(state.email);
            dispatch({type: 'Validate_Email', payload: regexResult});
        },500)
        return () => clearTimeout(timeoutRef.current);
    }, [state.email])

    const handleEmailSet = (e) =>{
        /*
        ** Dispatch holds a 'action' object that describes what a user did.  
        ** Type: Identifies which action to run (from case list)
        ** (optional field): data to be passed if modifying data. Property is 
        **      usually named 'payload', but can be renamed. 
        **  ex: Here user types in a email address within the 
        **      input field. Pass the text entered
        **      to be set as a new value/state of the email property
        */
        dispatch({
            type: 'Email_Set',
            emailInputted: e.target.value
        })
    }
    const handlePhoneSet = (e) => {
        // Allows only number to be typed 
        const phoneRegex = /^[0-9]*$/g;
        const regexResult = phoneRegex.test(e.target.value)
        if(regexResult){
            dispatch({
                type: 'Phone_Set', 
                phoneInputted: e.target.value
            })
        }
    }
    const handleCardNumberSet = (e) =>{
        // Notes: Creditcard validation would be done here
        //        Would be stored
        dispatch({
            type: 'Card_Number_Set',
            cardNumberInputted: e.target.value
        })
    }
    const handleCardExpiredDateSet = (e) => {
        // Notes: Would be stored
        //TODO: Use Debounce instead
        // const cardRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})*$/g;
        // const regexResult = cardRegex.test(e.target.value)
        // if(regexResult){
            dispatch({
                type: 'Card_Expired_Date_Set',
                expDateInputted: e.target.value
            })
        // }
    }
    const handleCardPinSet = (e) =>{
        // Notes: Not stored 
        // TODO: Dots on typing (hidden?)
        dispatch({
            type: 'Card_Pin_Set',
            name: e.target.name,
            value: e.target.value
        })
    }
    const handleDatePickupSelection = (dateInput) => {
        dispatch({
            type: 'Date_Pickup_Selected', 
            payload: dateInput.toLocaleDateString()
        })
    }
    const handleDateDeliverySelection = (dateInput) =>{
        dispatch({
            type: 'Date_Delivery_Selected',
            payload: dateInput.toLocaleDateString()
        })
    }
    const handleTimePickupSelection = (timeInput) => {
        dispatch({
            type: 'Time_Pickup_Selected',
            payload: timeInput.target.value
        })
    }
    const handleTimeDeliverySelection = (timeInput) => {
        dispatch({
            type: 'Time_Delivery_Selected',
            payload: timeInput.target.value
        })
    }
    const handleDeliveryAddressSet = (e) =>{
        dispatch({
            type: 'Delivery_Address_Set',
            name: e.target.name,
            value: e.target.value
        })
    }
    const handleErrorModalClose = () =>{
        setIsCartEmpty(false)
    }
    const handleReceiptClose = () =>{
        setIsReceiptOpen(false)
        navigate('/');
        // Clear Cart
        setCart([]) 
        localStorage.clear();
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const custCart = cartItemMergedData.map(itemOrder => ({
            productID: itemOrder._id,
            quantity: itemOrder.itemQuantity, 
            price: itemOrder.price

        }))
        // [1] - Only submit if at least 1 item is in cart 
        if(custCart.length === 0){
            setIsCartEmpty(true)
        }
        else{
            // TODO: 
            // data/format validation of form
            // make sure the fields if pickup/delivery is selected, no emepty
            try {
                const formData = {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone: state.phone,
                    ccn: state.ccn, 
                    pickupInfo: {
                        pickupDate: state.dateInputPickup,
                        pickupTime: state.timeInputPickup,
                    }, 
                    deliveryInfo:{
                        deliveryDate: state.dateInputDelivery,
                        deliveryTime: state.timeInputDelivery,
                        deliveryAddress: state.address,
                    },
                    cart: custCart, 
                    totalCost: calcTotalCost(),
                }
                await axios.post('http://localhost:5000/orders', formData)
                .then(res => res.data)
                // setIsOrderSuccessful(true) 
                dispatch({type: 'Form_Cleared'}) // Clear Fields
                // setCart([]) // clear cart (not local storage yet)
                // navigate('/receipt')
                setIsReceiptOpen(true)
            } catch (error) {
                console.log(error)
            }
        }       
    }
    // TODO: css responsiveness & styling
    return(
        <>
            {/* Add pop recieipet here forthis page, close btn to then wipe data */}
            {isReceiptOpen && <Receipt onClose={handleReceiptClose}/>}

            {isCartEmpty && <ErrorModal msg="Must have at least 1 item in cart to place order." onClose={handleErrorModalClose} />}
            {/* {isOrderSuccessful && <NotifModal msg="Order Successful!" close ={()=> setIsOrderSuccessful(false)}/>} */}
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
                            {/* Display Cart items if at least 1 item is in cart */}
                             {  cartItemMergedData.length >= 1 && cartItemMergedData.map((item)=>( 
                                <div className="order" key={item._id}>                   
                                    <div className="product-data">
                                        <img src={item.image}></img>
                                        <Link className= "item-name-link" to={`/productDetails/${item._id}`}>
                                            <p>{item.name}</p>
                                        </Link>
                                    </div>
                                    <p className="price-data">${item.price.toFixed(2)}</p>
                                    <input className="qty-data" defaultValue = {item.itemQuantity} onChange={(e)=>handleCartItemQuantity(e, item)} type = "number" min={'0'}/>
                                    <p className="total-data">${itemCost(item)}</p>
                                    <button className="del-btn" onClick={() => handleDeleteItem(item)}>X</button>
                                </div>
                            ))}
                            {/* Display if no items are in cart */}
                            {cartItemMergedData.length <= 0 && 
                            <div className='cart-empty-msg-container'>
                                <h1>Oh Noes!</h1>
                                <h1>Your Cart Is Empty!</h1>
                                <p>Quick! Fill the cart with goodies to start enjoying our treats</p>
                            </div>
                           }
                            
                        </div>

                        {/* Customer order form input */}
                        {/* TODO: Shipping (if user adds it)
                        Prep: Orders db setup */}
                        <form action = "#" method = "POST" onSubmit={handleFormSubmit} className="customer-details-container">
                            <div className="order-summary-container">
                                <p className='orderSum_header'>Order Summary</p>
                                <div>
                                    <div className="subtotal"> 
                                        <p>Subtotal</p>
                                        <p>${calcSubTotalCartCost()}</p>
                                    </div>
                                    <div className="tax">
                                        <p>Sales Tax</p>
                                        <p>${calcSalesTax()}</p>
                                    </div>
                                    <div className="shipping">
                                        <p>Shipping</p>
                                        <p>${calcDelivery()}</p>
                                    </div>
                                    <div className="total">
                                        <p>Total Order</p>
                                        <p>${calcTotalCost()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='order-contact-container'>
                                <div className="contact_header">
                                    <p>Contact</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={state.firstName || ""}
                                    onChange={handleNameInputChange}
                                    placeholder='First Name'
                                    required
                                    />
                                <input 
                                    type='text' 
                                    name="lastName"
                                    value={state.lastName || ""}
                                    onChange={handleNameInputChange}
                                    placeholder='Last Name'
                                    required
                                    />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={state.email || ""}
                                    onChange={handleEmailSet}
                                    placeholder='Email'
                                    required
                                    />
                                {/* TODO: Style */}
                                {!state.isEmailValid && <p>Please enter a valid email</p>}
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={state.phone || ""}
                                    onChange={handlePhoneSet}
                                    placeholder='Phone Number'
                                    minLength={10}
                                    maxLength={10}
                                    required
                                    />
                            </div>

                            <div className="payment-container">
                                <div className='payment_header'> 
                                    <p>Payment</p> 
                                    <img className='cardIcon' src={cardIcon}></img>
                                </div>

                                <div className="cardInfo-container">
                                    <p>Card Information</p>
                                    <div className="card-input-container">
                                        <input 
                                            type="text" 
                                            name="ccn"
                                            value={state.ccn || ""}
                                            onChange={handleCardNumberSet}
                                            minLength={15}
                                            maxLength={19}
                                            placeholder='Card Number'
                                            required
                                            />
                                        <div>
                                            <input type='text' placeholder='MM / YY'
                                            name='ccExpireDate'
                                            value={state.ccExpireDate || ""}
                                            onChange={handleCardExpiredDateSet}
                                            required
                                            />
                                            <input type="text" maxLength={3} placeholder='CVC'
                                            name='ccVerify'
                                            value={state.ccVerify || ""}
                                            onChange={handleCardPinSet}
                                            required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="order-method-container">
                                    {/* Pickup Option */}
                                    <div className="time_header">
                                        {/* Pickup Button*/}
                                        <input 
                                            type='radio'
                                            name="order-method" 
                                            className='order-method-btn' 
                                            value= "pickup" 
                                            checked={state.selectedOptionBtn === 'pickup'}
                                            onChange={handleOrderRadioBtn}
                                        />
                                        <div>
                                            <p>Pick Up</p>
                                            <img className='timeIcon' src={timeIcon}></img>
                                        </div>
                                    </div>
                                    <div className='formatDateandTimeDisplay'>
                                        {/* Pickup Date */}
                                        <DatePicker 
                                            name=''
                                            selected={state.dateInputPickup}
                                            onChange={handleDatePickupSelection}
                                            disabled={state.isPickupDateDisabled}
                                            showIcon
                                            icon="bi bi-calendar"
                                        />
                                        {/* Pickup Time */}
                                        <input 
                                            type="time"
                                            name="" 
                                            id="" 
                                            min="" max="" 
                                            value={state.timeInputPickup || ""}
                                            onChange={handleTimePickupSelection}
                                            disabled={state.isPickupTimeDisabled}
                                        />
                                    </div>
                                    <p>OR</p>
                                    {/* Delivery Option */}
                                    <div className="delivery_header">
                                        {/* Delivery Button*/}
                                        <input 
                                            type='radio'
                                            name="order-method" 
                                            className='order-method-btn' 
                                            value="delivery" 
                                            onChange={handleOrderRadioBtn}
                                            checked={state.selectedOptionBtn === 'delivery'}
                                            />
                                        <div>
                                            <p>Delivery</p>
                                            <img className='truckIcon' src={truckIcon}></img>
                                        </div>
                                    </div>
                                    <div className='formatDateandTimeDisplay'>
                                        {/* Delivery Date */}
                                        <DatePicker 
                                            name=''
                                            selected={state.dateInputDelivery}
                                            onChange={handleDateDeliverySelection}
                                            disabled={state.isDeliveryDateDisabled}
                                            showIcon
                                            icon='bi bi-calendar'
                                        />
                                        {/* Delivery Time */}
                                        <input 
                                            type="time" 
                                            name="" 
                                            id="" 
                                            min="" max="" 
                                            onChange={handleTimeDeliverySelection}
                                            value={state.timeInputDelivery || ""}
                                            disabled={state.isDeliveryTimeDisabled}/>
                                    </div>
                                    {/* Delivery Address */}
                                    <div className='order-address-container'>
                                        <label htmlFor="">Address</label>
                                        <input 
                                            type="text" 
                                            name='address' 
                                            value={state.address || ""}
                                            onChange={handleDeliveryAddressSet}
                                            disabled={state.isDeliveryAddressDisabled}
                                        />
                                        <p className="deliveryNote">* Note: Will only make deliveries within a 15 mile radius</p>
                                        </div>
                                </div>
                                {/* Form submit btn - add a confrim notif */}
                                <button className='order-btn' type='submit'>Place Order</button>

                                <div className='assistance_contact'>
                                    <p>Need Assistance?</p>
                                    <div className="phoneContact">
                                        <img className="phoneIcon" src={phoneIcon}></img>
                                        <p>555-555-5555</p>
                                </div>
                               
                                </div>
                            
                            </div>
                        </form>
                    </div>
                   
                </div>

            </section>
        </>
    )
}
export default UserCart;