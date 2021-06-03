import {CarouselBlock} from '../components/CarouselBlock'

import FormTalk from '../components/FormTalk'
import Info from '../components/Info'
import {Container} from 'react-bootstrap'

export  const HomePage = () => {
    return (
       <>
       <Container>
            <CarouselBlock/>
            <Info/>
            <FormTalk />
            </Container>
            
            </>
    )
}
