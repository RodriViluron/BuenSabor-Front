import { Carousel } from "react-bootstrap"

const CarouselHome = ()=>{
    return(
        <>
        <Carousel>
          <Carousel.Item>
            <img
              className='d-block w-100'
              style={{maxHeight:"500px",objectFit:'cover'}}
              src="images/slide1.jpg" alt="Imagen Hamburgesa" />
            <Carousel.Caption>
              <h3>Hamburguesa Completa</h3>
              <p>Disfruta de una experiencia con el mejor cheddar, bacon y cebolla.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              style={{maxHeight:"500px",objectFit:'cover'}}
              src="images/slide2.jpg" alt="Imagen Hamburgesa" />
            <Carousel.Caption>
              <h3>Hamburguesa Pepino</h3>
              <p>Disfruta de una experiencia épica (solo para amantes del pepino).</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
            className='d-block w-100'
            style={{maxHeight:"500px",objectFit:'cover'}}
            src="images/slide3.jpg" alt="Imagen Hamburgesa" />
              <Carousel.Caption>
                <h3>Hamburguesa Bacon</h3>
                <p>
                Disfruta de una experiencia llena de bacon y cheddar.
                </p>
              </Carousel.Caption>
          </Carousel.Item>
          </Carousel>
        </>
    
    )
}
export default CarouselHome;