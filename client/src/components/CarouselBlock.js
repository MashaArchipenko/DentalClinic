import { Carousel, Container } from 'react-bootstrap'
import firstPic from './img/image 1.jpg'
import secondPic from './img/image 2.jpg'
import thirdPic from './img/image31.jpg'
import fourthPic from './img/image11.jpg'
import fifthPic from './img/people.jpg'

export const CarouselBlock = () => {

  const carouselHeight = '530px'
  return (
    <Carousel style={{ backgroundColor: '#D8D9DB' }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={firstPic}
          alt="First slide"
          style={{ height: carouselHeight }}
        />
        <Carousel.Caption>
          <h3>Комфортабельные кабинеты с лучшим оборудованием</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={secondPic}
          alt="Second slide"
          style={{ height: carouselHeight }}
        />
        <Carousel.Caption >
          <h3>Нас любят даже дети</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={thirdPic}
          alt="Third slide"
          style={{ height: carouselHeight }}
        />
        <Carousel.Caption>
          <h3>Самые идеальные улыбки</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fourthPic}
          alt="Third slide"
          style={{ height: carouselHeight }}
        />
        <Carousel.Caption>
          <h3>Сотни довольных клиентов</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fifthPic}
          alt="Third slide"
          style={{ height: carouselHeight }}
        />
        <Carousel.Caption>
          <h3>Приветливый коллектив</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
