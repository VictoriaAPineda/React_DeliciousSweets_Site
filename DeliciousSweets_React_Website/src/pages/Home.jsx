import storefront from "/src/images/storefront.jpg";
import qualityImg from "/src/images/siftingOverCake.png";
import pickupImg from "/src/images/service_img.png";
import deliveryImg from "/src/images/delivery_img.png";
import truckIcon from "/src/images/delivery_truck.png";
import BannerSpecial from "../BannerSpecial";
import brownieImg from "/src/images/brownines-img.png"
import cupcakeImg from "/src/images/cupcakes.jpg"
import doughnutImg from "/src/images/doughnuts.jpg"
import ourStoryImg from "/src/images/hands_with_flour.jpg"

export default function Home (){

    const bannerImages = [brownieImg,cupcakeImg,doughnutImg,];
    return(
        <>
            <section id="main-img-container">
                <img src={storefront} id="storefront-img"></img>
            </section>

            <section id="info-imgs-container">
                <div className="info-imgs-grid">
                    <div className="grid-item-01 box-shadow">
                        <p className="centered-txt large-font">Quality Ingredients</p>
                        <img src={qualityImg}></img>
                    </div>
                    <div className="grid-item-02 box-shadow">
                        <p className="bottom-right-txt  medium-font ">In Store Pickup</p>
                        <img src={pickupImg}></img>
                    </div>
                    <div className="grid-item-03 box-shadow"> 
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

            <section id="ourStory_container">
                <img src={ourStoryImg} className="box-shadow"></img>

                <div className="story_txt_container centered-txt">
                    <p className="large-font">Our Story</p>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, egestas sed sed risus pretium quam. Lacus viverra vitae congue eu consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, egestas sed sed risus pretium quam. Lacus viverra vitae congue eu consequat. 
                    </p>
                </div>
            </section>
        </>
    )
}