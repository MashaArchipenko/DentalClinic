import { Carousel } from 'react-bootstrap'
import firstPic from './img/pexels-photo-287227.jpeg'
import secondPic from './img/pexels-photo-298611.jpeg'
import thirdPic from './img/pexels-photo-3952126.jpeg'
import fourthPic from './img/pexels-photo-6129507.jpeg'
import fifthPic from './img/pexels-photo-6528907.jpeg'

export const CarouselBlock = () => {

  const carouselHeight='530px'
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={firstPic}
        alt="First slide"
        style={{height:carouselHeight}}
      />
      <Carousel.Caption>
        <h3>Бесплатнаня консультация</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={secondPic}
        alt="Second slide"
        style={{height:carouselHeight}}
      />
  
      <Carousel.Caption>
        <h3>Отзывчивый коллектив</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={thirdPic}
        alt="Third slide"
        style={{height:carouselHeight}}
      />
  
      <Carousel.Caption>
        <h3>Самые приятные цены</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={fourthPic}
        alt="Third slide"
        style={{height:carouselHeight}}
      />
  
      <Carousel.Caption>
        <h3>Самые приятные цены</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={fifthPic}
        alt="Third slide"
        style={{height:carouselHeight}}
      />
  
      <Carousel.Caption>
        <h3>Самые приятные цены</h3>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}
