import storefront from "/src/images/storefront.jpg";
import qualityImg from "/src/images/hands_with_flour.jpg";
import pickupImg from "/src/images/service_img.png";
import deliveryImg from "/src/images/delivery_img.png";

export default function Home (){

    return(
        <>
  
            <section id="main-img-container">
                <img src={storefront} id="storefront-img"></img>
            </section>

            <section id="info-imgs-grid-container">
                {/* <div className="info-imgs-grid"> */}
                    <div className="one-img">
                        <img src={qualityImg}></img>
                    </div>

                    <div className="two-img">
                        <img src={pickupImg}></img>
                    </div>

                    <div className="three-img"> 
                        <img src={deliveryImg}></img>
                    </div>
                {/* </div> */}
            </section>



 
        
        </>
    )

}