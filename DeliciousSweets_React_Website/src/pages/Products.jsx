import BannerSpecial from "../BannerSpecial";
import brownieImg from "/src/images/brownines-img.png"
import cupcakeImg from "/src/images/cupcakes.jpg"
import doughnutImg from "/src/images/doughnuts.jpg"


function Products(){
    const bannerImages = [brownieImg,cupcakeImg,doughnutImg,];
    return(
        <>
            
            <section>
                <BannerSpecial images = {bannerImages}/>
            </section>
        </>
    )
}
export default Products;