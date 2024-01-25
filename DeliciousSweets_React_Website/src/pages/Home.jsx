import storefront from "/src/images/storefront.jpg";
import qualityImg from "/src/images/siftingOverCake.png";
import pickupImg from "/src/images/service_img.png";
import deliveryImg from "/src/images/delivery_img.png";
import truckIcon from "/src/images/delivery_truck.png";

export default function Home (){

    return(
        <>
            <section id="main-img-container">
                <img src={storefront} id="storefront-img"></img>
            </section>

            <section id="info-imgs-container">
                <div className="info-imgs-grid">
                    <div className="grid-item-01">
                        <p className="centered-txt">Quality Ingredients</p>
                        <img src={qualityImg}></img>
                    </div>
                    <div className="grid-item-02">
                        <p className="bottom-txt">In Store Pickup</p>
                        <img src={pickupImg}></img>
                    </div>
                    <div className="grid-item-03"> 
                        <img src={truckIcon} className="centerd-icon" id="truckIcon"></img>
                        <img src={deliveryImg}></img>
                    </div>
                </div>
            </section>    
        </>
    )
}