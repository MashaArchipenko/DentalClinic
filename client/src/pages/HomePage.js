import {CarouselBlock} from '../components/CarouselBlock'
import Footer from '../components/Footer'
import FormTalk from '../components/FormTalk'
import Info from '../components/Info'
import  MapContainer from '../components/Map'

export  const HomePage = () => {
    return (
       <>
            <CarouselBlock/>
            <Info/>
            <FormTalk />
            
            <Footer/>
            </>
    )
}
