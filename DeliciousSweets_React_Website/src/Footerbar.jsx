import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"
import { useState } from "react"
import axios from "axios"
export default function Footerbar(){

    const [emailData, setEmailData] = useState('')

    const handleSumbit = async (e) => {
        e.preventDefault()
        try{
            const postData = {
                email: emailData
            }
            await axios.post('http://localhost:5000/emails', postData)
            .then( res => res.data)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
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
                                    type="text" 
                                    id="subscribe-input" 
                                    name="email"
                                    value={emailData}
                                    onChange={(e) => setEmailData(e.target.value)}
                                />
                                <button tyep="submit" id="subscribe-btn" onClick={handleSumbit} >Subscribe</button>
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