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

            <section id="info-imgs-container">
                <div className="info-imgs-grid">
                    <div className="grid-item-01">
                        <img src={qualityImg}></img>
                    </div>
                    <div className="grid-item-02">
                            <img src={pickupImg}></img>
                    </div>
                    <div className="grid-item-03"> 
                            <img src={deliveryImg}></img>
                    </div>
                </div>
            </section>    
        </>
    )
}