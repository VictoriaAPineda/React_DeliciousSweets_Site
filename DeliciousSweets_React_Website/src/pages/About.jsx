import topImg from '/src/images/about_cake_img.jpg';
import bgtxtImg from '/src/images/dough_bg.jpg';

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
                
            </section>
        </>
    )
}
export default About;