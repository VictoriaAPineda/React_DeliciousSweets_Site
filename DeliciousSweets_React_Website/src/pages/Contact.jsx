import contact_bgImg from '/src/images/about_Bg_img.jpg';
export default function Contact(){

    return(
        <>
            <section id='contact_pg_container'>
                <div className='info_card_container'>
                    <p className='large-font'>- Contact Us -</p>
                    <div className='contact_details'>
                        <p>Phone: (555) 555-5555</p>
                        <p>Email: Example@mail.com</p>
                        <p>Address: 123 Street Name</p>
                        <p>Hours: Mon-Sat 8:00am - 5:00pm</p>
                    </div>
                </div>
                <img src={contact_bgImg} id='contactPg_bgImg'></img>
            </section>
        </>
    )
}
