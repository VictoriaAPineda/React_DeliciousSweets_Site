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
                            <p>Google Map</p>
                            <p>Address 123 Street Ave.</p>
                            <div>
                                <div id="google-map">
                         
                                </div>
                            </div>
                        </div>

                        <div  className="footercol">
                            <p>Heading One</p>
                            <p>Address 123 Street Ave.</p>
                            <p>Phone: 555-555-555</p>
                            <p>Socials:</p>
                        </div>

                        <div  className="footercol">
                            <p>Heading Two</p>
                            <p>Address 123 Street Ave.</p>
                            <p>Phone: 555-555-555</p>
                            <p>Socials:</p>
                        </div>

                        <div  className="footercol">
                            <p> Heading Three</p>
                            <div>
                                <input/>
                                <button>Subscribe</button>
                            </div>
                           
                            <p>Follow Us</p>
                            <div className="social-btn-group">
                                <p>[Icon]</p>                         
                                <p>[Icon]</p>    
                                <p>[Icon]</p>                         
                                <p>[Icon]</p>   
                            </div>
                        </div>
                    </div>
                </div>

                    {/* Change location?
                    <footer>
                        <p>@CopyRight 2023</p>
                        <div>
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                        <p>Refund Policy</p>
                        </div>
                    </footer> */}
            </section>
        </>
    )
}