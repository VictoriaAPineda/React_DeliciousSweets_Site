import { Link } from "react-router-dom"
import logo from "./logo/Delicious_Sweets.png"
export default function Footerbar(){
    {/* Use Grid here!*/}
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
                            <div>
                                <input id="subscribe-input"/>
                                <button id="subscribe-btn">Subscribe</button>
                            </div>
                           
                        
                            <div className="social-btn-group">
                            <i class="bi bi-twitter-x social-icon"></i>                        
                            <i class="bi bi-facebook social-icon"></i>
                            <i class="bi bi-instagram social-icon"></i>                        
                            <i class="bi bi-youtube social-icon"></i>
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