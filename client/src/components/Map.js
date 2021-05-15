import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Container } from 'react-bootstrap';

const mapStyles = {
    position:'fixed',
    zIndex:'3',
   margin:'10px 30px'
};

export class MapContainer extends Component {
    render() {
        return (
            <Container style={mapStyles}>
                <Map
                    google={this.props.google}
                    zoom={14}
                    
                    initialCenter={
                        {
                            lat: 52.405814,
                            lng: 30.938212
                        }
                    }
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Kenyatta International Convention Centre'}
                        position={{ lat: 52.405814, lng: 30.938212 }}
                    />
                </Map>
            </Container>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDbwVvHmgCfqlSwjDvhvUqRvRNexoSmRGg")
})(MapContainer)
