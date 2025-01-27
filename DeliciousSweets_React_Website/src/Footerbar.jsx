import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"
import { useEffect, useState } from "react"
import axios from "axios"
import NotifModal from "./modals/NotifModal"
import ErrorModal from "./modals/ErrorModal"
export default function Footerbar(){

    const [emailData, setEmailData] = useState('')
    const [emailList, setEmailList] = useState([])
    const [isNotifModalOpen, setIsNotifModalOpen] = useState(false) 
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false) 

    // List of all emails that have subscribed
    useEffect(()=>{
        axios.get('http://localhost:5000/emails')
        .then( (email) => {
            setEmailList(email.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    const handleSumbit = async (e) => {
        e.preventDefault()
        // [1] Check for format 



        // [2] Check for duplicates
        const emailMatch =  emailList.find(e => e.email === emailData)
        if(!emailMatch){
            try{
                const postData = {
                    email: emailData
                }
                setIsNotifModalOpen(true)
                await axios.post('http://localhost:5000/emails', postData)
            .then( res => res.data)
            }catch(err){
                console.log(err)
            }
        }else{
            setIsErrorModalOpen(true)
        }
    }
    
    const handleErrorModalClose = () =>{
        setIsErrorModalOpen(false)
    }

    return(
        <>
            {isNotifModalOpen && <NotifModal msg='Email Subscribed!' close ={()=> setIsNotifModalOpen(false)}/>}

            {isErrorModalOpen && <ErrorModal msg ='Already Subscribed!' onClose = {handleErrorModalClose}/>}

            <section id="footer-section">
                <div>
                    <div id="columns">
                        <div className="footercol">
                            <img src={logo}></img> 
                            <p className="col-heading">Google Map</p>
                            <p>Address 123 Street Ave.</p>
                            <div>
                                <div id="google-map">
                         
                                </div>
                            </div>
                        </div>

                        <div  className="footercol">
                            <p className="col-heading">Heading One</p>
                            <p>Address 123 Street Ave.</p>
                            <p>Phone: 555-555-555</p>
                            <p>Socials:</p>
                        </div>

                        <div  className="footercol">
                            <p className="col-heading" >Heading Two</p>
                            <p>Address 123 Street Ave.</p>
                            <p>Phone: 555-555-555</p>
                            <p>Socials:</p>
                        </div>

                        <div  className="footercol">
                            <p className="col-heading" > Heading Three</p>
                            {/* TODO: Validation check , Pop up to notify acceptance/ already in system/ wrong format 
                            ??? : not working...*/}
                            <form action="/emails" method="POST">
                                <input 
                                    placeholder="enter email"
                                    type="email" 
                                    id="subscribe-input" 
                                    name="email"
                                    value={emailData}
                                    onChange={(e) => setEmailData(e.target.value)}
                                />
                                <button type="submit" id="subscribe-btn" onClick={handleSumbit} >Subscribe</button>
                            </form>
                           
                        
                            <div className="social-btn-group">
                            <i className="bi bi-twitter-x social-icon"></i>                        
                            <i className="bi bi-facebook social-icon"></i>
                            <i className="bi bi-instagram social-icon"></i>                        
                            <i className="bi bi-youtube social-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bottom-text">
                    <div>
                        <p>@CopyRight 2023</p>
                    </div>

                    <div className="info-right">
                        <p>Terms of Service |</p>
                        <p>Privacy Policy | </p>
                        <p>Refund Policy</p>
                    </div>
                </div>
          
            </section>
        </>
    )
}