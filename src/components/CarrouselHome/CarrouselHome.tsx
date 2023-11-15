import { Carousel } from "react-bootstrap"


const CarrouselHome = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src='/images/hamburguesa5.jpg'
                        alt='Mi Tasti'
                    />
                    <Carousel.Caption>
                        <h3>Proba la nueva "Mi Tasti"</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="/images/hamburguesa6.jpg"
                        alt='Burguer Dios'
                    />

                    <Carousel.Caption>
                        <h3>"Esto es Boca" - Martín Agazzi</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="/images/hamburguesa4.jpg"
                        alt='Messi'
                    />

                    <Carousel.Caption>
                        <h3>"Andá pa' allá, bobo" - Franco Miglia</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="/images/hamburguesa3.jpg"
                        alt='Colo'
                    />
                    <Carousel.Caption>
                        <h3>"Diego está entre nosotros" - Maximo</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="/images/hamburguesa2.jpg"
                        alt='Barco'
                    />
                    <Carousel.Caption>
                        <h3>"Diego está entre nosotros" - Maximo</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="/images/Hamburguesa1.jpg"
                        alt='Riquelme'
                    />
                    <Carousel.Caption>
                        <h3>"Diego está entre nosotros" - Maximo</h3>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </>
    )
}

export default CarrouselHome