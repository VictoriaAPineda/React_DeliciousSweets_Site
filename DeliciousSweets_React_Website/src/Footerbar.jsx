import { Link } from "react-router-dom"

export default function Footerbar(){
    {/* Use Grid here!*/}
    return(
        <>
            <section id="footer-section">
                <div className="footer-container">
                    <div className="footercol">
                        <Link to="/">Delicious Sweets logo here</Link>
                        <p>Google Map</p>
                        <p>Address 123 Street Ave.</p>
                        <div>
                            <p>[Google Map img]</p>
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
                        <input/>
                        <button>Subscribe</button>
                        <p>Follow Us</p>
                        <div>
                            <p>[Icon]</p>                         
                            <p>[Icon]</p>    
                            <p>[Icon]</p>                         
                            <p>[Icon]</p>   
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