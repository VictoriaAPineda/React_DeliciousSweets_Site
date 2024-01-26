import storefront from "/src/images/storefront.jpg";
import qualityImg from "/src/images/siftingOverCake.png";
import pickupImg from "/src/images/service_img.png";
import deliveryImg from "/src/images/delivery_img.png";
import truckIcon from "/src/images/delivery_truck.png";
import BannerSpecial from "../BannerSpecial";

export default function Home (){

    const bannerImages = ['https://via.placeholder.com/800x400/ff5733/fff',
    'https://via.placeholder.com/800x400/33ff57/fff',
    'https://via.placeholder.com/800x400/5733ff/fff',];
    return(
        <>
            <section id="main-img-container">
                <img src={storefront} id="storefront-img"></img>
            </section>

            <section id="info-imgs-container">
                <div className="info-imgs-grid">
                    <div className="grid-item-01">
                        <p className="centered-txt large-font">Quality Ingredients</p>
                        <img src={qualityImg}></img>
                    </div>
                    <div className="grid-item-02">
                        <p className="bottom-right-txt  medium-font ">In Store Pickup</p>
                        <img src={pickupImg}></img>
                    </div>
                    <div className="grid-item-03"> 
                        <img src={truckIcon} className="centered-icon" id="truckIcon"></img>
                        <p className="lower-centered-txt large-font">Delivery</p>
                        <div>
                            <p className="bottom-centered-txt small-font">* Only avaliable within a 15 mile radius</p>
                        </div>
                      
                        <img src={deliveryImg}></img>
                    </div>
                </div>
            </section>    

       
            <BannerSpecial images = {bannerImages}/>

            <section>
                <h1>- TODO: "Our Story" here-</h1>
            </section>
        </>
    )
}