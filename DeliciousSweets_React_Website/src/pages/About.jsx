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

            <section className='about_text_container'>
                <div>
                    <p className='large-font about_us_header'>About Us</p>
                    <p className='about_text'> <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod illo sunt expedita perspiciatis, commodi aliquam delectus quia rem! Nemo rerum corrupti saepe maiores voluptatibus nostrum tenetur quos officia neque eligendi!</span>
                   <span>Nobis quibusdam vel, adipisci culpa quisquam nihil tempora ipsam veniam, explicabo sapiente, enim iste. Est facilis hic, sed aspernatur blanditiis praesentium nostrum earum, doloremque id facere velit officia odio alias!</span>
                    <span>Animi, quam molestias perspiciatis cumque mollitia atque optio excepturi fugiat, velit libero voluptate nesciunt doloribus, repudiandae placeat aliquid repellendus iusto aspernatur? Ducimus totam quam dolore doloremque repudiandae officiis dolorem enim.</span></p>
                </div>
       
                <img src={bgtxtImg} id='aboutTextBg'></img>
            </section>

            <section className='imageRow_container'>
                <img src={whiteBerryCake01} className='bottomRowImgs'></img>
                <img src={cookies02} className='bottomRowImgs'></img>
                <img src={cherryCupcakes03} className='bottomRowImgs'></img>
            </section>
        </>
    )
}
export default About;