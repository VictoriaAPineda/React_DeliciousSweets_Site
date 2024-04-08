import defaultCardImg from "/src/images/honeycake.jpg"

/* Related products carousel on product details page */
export const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1250 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1250, min: 900 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 900, min: 750 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
      items: 2
    }
  };

/* dummy data for products*/
export const productData = [
    {
        id: 1,
        image:defaultCardImg,
        name:"Product 01",
    },
    {
        id: 2,
        image:defaultCardImg,
        name:"Product 02",
    },
    {
        id: 3,
        image:defaultCardImg,
        name:"Product 03",
    },
    {
        id: 4,
        image:defaultCardImg,
        name:"Product 04",
    },
    {
        id: 5,
        image:defaultCardImg,
        name:"Product 05",
    },
  ]