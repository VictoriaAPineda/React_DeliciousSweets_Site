import topImg from '/src/images/about_cake_img.jpg';
import bgtxtImg from '/src/images/dough_bg.jpg';
import whiteBerryCake01 from '/src/images/whiteCakeWithBerries.jpg';
import cookies02 from '/src/images/cookieBasket.jpg';
import cherryCupcakes03 from '/src/images/cherrytopCupcakes.jpg';

function About(){
    return(
        <>
            <section>
                <img src={topImg} id='topAboutImg'></img>
            </section>

            <section>
                <img src={bgtxtImg} id='aboutTextBg'></img>
            </section>

            <section>
                <img src={whiteBerryCake01}></img>
                <img src={cookies02}></img>
                <img src={cherryCupcakes03}></img>
            </section>
        </>
    )
}
export default About;