import { Carousel } from 'react-bootstrap'
import pic from './pexels-photo-287227.jpeg'

export const CarouselBlock = () => {

  const carouselHeight='530px'
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={pic}
        alt="First slide"
        style={{height:carouselHeight}}
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={pic}
        alt="Second slide"
        style={{height:carouselHeight}}
      />
  
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={pic}
        alt="Third slide"
        style={{height:carouselHeight}}
      />
  
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}
