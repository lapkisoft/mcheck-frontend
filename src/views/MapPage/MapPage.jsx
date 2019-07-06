/*global google*/
import React, {Component, Fragment} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer,
    InfoWindow
} from 'react-google-maps';
import driver1 from '../../data/driver-01.json';
import driver2 from '../../data/driver-02.json';
import driver3 from '../../data/driver-03.json';

const {compose, withProps, lifecycle} = require('recompose');

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyALzBzV-LGkRl6wqAojCO45Mv0myyRj4kE&v=3.exp&libraries=geometry,drawing,places';

class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state        = {
            selectDriver: null,
            drivers:      [
                {
                    id:          0,
                    lng:         driver1.origin.lng,
                    lat:         driver1.origin.lat,
                    origin:      driver1.origin,
                    destination: driver1.destination,
                    direction:   null,
                    isOpen:      false,
                    balloonText: 'Иван Иванович'
                },
                {
                    id:          1,
                    lng:         driver2.origin.lng,
                    lat:         driver2.origin.lat,
                    origin:      driver2.origin,
                    destination: driver2.destination,
                    direction:   null,
                    isOpen:      false,
                    balloonText: 'Петр'
                },
                {
                    id:          2,
                    lng:         driver3.origin.lng,
                    lat:         driver3.origin.lat,
                    origin:      driver3.origin,
                    destination: driver3.destination,
                    direction:   null,
                    isOpen:      false,
                    balloonText: 'Николай Максимов'
                }]
        };
        this.setDirection = this.setDirection.bind(this);
        this.onOpen       = this.onOpen.bind(this);
        this.onClose      = this.onClose.bind(this);
        setInterval(() => {
            let drivers = this.state.drivers;
            if (driver1.coords.length) {
                let coords     = driver1.coords.shift();
                drivers[0].lat = coords.lat;
                drivers[0].lng = coords.lng;
            }
            if (driver2.coords.length) {
                let coords     = driver2.coords.shift();
                drivers[1].lat = coords.lat;
                drivers[1].lng = coords.lng;
            }
            if (driver3.coords.length) {
                let coords     = driver3.coords.shift();
                drivers[2].lat = coords.lat;
                drivers[2].lng = coords.lng;
            }

            this.setState({drivers});
        }, 100);
    }

    onClose(driver) {
        let drivers               = this.state.drivers;
        drivers[driver.id].isOpen = false;
        this.setState({drivers});
    }

    onOpen(driver) {
        let drivers = this.state.drivers;
        drivers.forEach((item, i) => {
            drivers[i].isOpen = false;
        });
        drivers[driver.id].isOpen = true;
        this.setState({drivers});
    }

    setDirection(driver) {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin:      new google.maps.LatLng(driver.origin.lat, driver.origin.lng),
            destination: new google.maps.LatLng(driver.destination.lat, driver.destination.lng),
            travelMode:  google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    CMap = compose(
        withProps({
            googleMapURL:     googleMapURL,
            loadingElement:   <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `100vh`}}/>,
            mapElement:       <div style={{height: `100%`}}/>
        }),
        withScriptjs,
        withGoogleMap
    )(props =>
        <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(55.00505, 82.93761)}
        >
            {props.directions && <DirectionsRenderer directions={props.directions}/>}
            {props.children}
        </GoogleMap>
    );

    render() {
        let selectDriver = 0;
        return (
            <Fragment>
                <this.CMap center={{lat: 25.03, lng: 121.6}} driver={this.state.drivers[0]}>
                    {this.state.directions && <DirectionsRenderer directions={this.state.directions}/>}
                    {this.state.drivers.map((driver) => <Marker
                        key={driver.id} position={{lat: driver.lat, lng: driver.lng}} onClick={() => {
                        this.onOpen(driver);
                        this.setDirection(this.state.drivers[driver.id]);
                    }}
                    >
                        {driver.isOpen && <InfoWindow>
                            <div>{driver.balloonText}</div>
                        </InfoWindow>}
                    </Marker>)}

                </this.CMap>
            </Fragment>
        );
    }
}

export default MapPage;