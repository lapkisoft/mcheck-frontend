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
import markerClearIcon from '../assets/img/marker-clear.png';
import markerFailedIcon from '../assets/img/marker-failed.png';
import markerCheckFailedIcon from '../assets/img/marker-check-failed.png';
import markerCheckWaitingIcon from '../assets/img/marker-check-waiting.png';
import markerCheckSuccessIcon from '../assets/img/marker-check-success.png';

import driver1 from '../data/driver-01.json';
import driver2 from '../data/driver-02.json';
import driver3 from '../data/driver-03.json';

const {compose, withProps} = require('recompose');

const markerClearIconResized = {
    url: markerClearIcon,
    scaledSize: new google.maps.Size(31, 31)
}
const markerFailedIconResized = {
    url: markerFailedIcon,
    scaledSize: new google.maps.Size(31, 31)
}
const markerCheckFailedIconResized = {
    url: markerCheckFailedIcon,
    scaledSize: new google.maps.Size(31, 31)
}
const markerCheckWaitingIconResized = {
    url: markerCheckWaitingIcon,
    scaledSize: new google.maps.Size(31, 31)
}
const markerCheckSuccessIconResized = {
    url: markerCheckSuccessIcon,
    scaledSize: new google.maps.Size(31, 31)
}

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyALzBzV-LGkRl6wqAojCO45Mv0myyRj4kE&v=3.exp&libraries=geometry,drawing,places';

class MapView extends Component {
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
                    balloonText: 'Иван Иванович',
                    status: 'clear',
                    checks: [
                        { id: 0, lng: 86.02376, lat: 55.13408, title: 'Контрольный пункт1', status: 'waiting', customStatus: 'success' },
                        { id: 1, lng: 87.09174, lat: 55.87043, title: 'Контрольный пункт2', status: 'waiting', customStatus: 'success' }
                    ]
                },
                {
                    id:          1,
                    lng:         driver2.origin.lng,
                    lat:         driver2.origin.lat,
                    origin:      driver2.origin,
                    destination: driver2.destination,
                    direction:   null,
                    isOpen:      false,
                    balloonText: 'Петр',
                    status: 'clear',
                    checks: [
                        { id: 0, lng: 77.75035, lat: 55.32183, title: 'Контрольный пункт', status: 'waiting', customStatus: 'success' }
                    ]
                },
                {
                    id:          2,
                    lng:         driver3.origin.lng,
                    lat:         driver3.origin.lat,
                    origin:      driver3.origin,
                    destination: driver3.destination,
                    direction:   null,
                    isOpen:      false,
                    balloonText: 'Николай Максимов',
                    status: 'clear',
                    checks: [
                        { id: 0, lng: 83.02373, lat: 55.14268, title: 'Контрольный пункт', status: 'waiting', customStatus: 'success' },
                        { id: 1, lng: 84.5697, lat: 55.66112, title: 'Контрольный пункт', status: 'waiting', customStatus: 'failed' }
                    ]
                }]
        };
        this.setDirection = this.setDirection.bind(this);
        this.onOpen       = this.onOpen.bind(this);
        this.onClose      = this.onClose.bind(this);

        const comeCheck = (driver, coords) => driver.checks.findIndex((element, index, array) => {
            return element.lng == coords.lng && element.lat == coords.lat;
        })
        const timerTick = (driverObject, driver) => {
            let coords     = driverObject.coords.shift();
            driver.lat = coords.lat;
            driver.lng = coords.lng;
            let checkIndex = comeCheck(driver, coords);
            if (checkIndex >= 0)
                driver.checks[checkIndex].status = driver.checks[checkIndex].customStatus;

            if (checkIndex >= 0 && driver.checks[checkIndex].status == 'failed')
                driver.status = 'failed';

            return driver;
        }

        setInterval(() => {
            let drivers = this.state.drivers;
            if (driver1.coords.length) {
                drivers[0] = timerTick(driver1, drivers[0]);
            }
            if (driver2.coords.length) {
                drivers[1] = timerTick(driver2, drivers[1]);
            }
            if (driver3.coords.length) {
                drivers[2] = timerTick(driver3, drivers[2]);
            }

            this.setState({drivers});
        }, 10);
        this.CMap = compose(
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
                defaultOptions={{ streetViewControl: false,zoomControl: false, fullscreenControl: false }}
            >
                {props.directions && <DirectionsRenderer directions={props.directions}/>}
                {props.children}
            </GoogleMap>
        );
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

    render() {
        return (
            <Fragment>
                <this.CMap center={{lat: 25.03, lng: 121.6}} driver={this.state.drivers[0]}>
                    {this.state.directions && <DirectionsRenderer directions={this.state.directions}/>}
                    {this.state.drivers.map((driver) =>
                        <Marker
                            icon={driver.status == 'clear' ? markerClearIconResized : markerFailedIconResized }
                            key={driver.id} position={{lat: driver.lat, lng: driver.lng}} onClick={() => {
                            this.onOpen(driver);
                            this.setDirection(this.state.drivers[driver.id]);
                        }}
                        >
                            {driver.isOpen && <InfoWindow>
                                <div>{driver.balloonText}</div>
                            </InfoWindow>}
                        </Marker>
                    )}
                    {this.state.drivers.map((driver) =>
                        driver.checks.map((check) => <Marker icon={ check.status === 'waiting' ? markerCheckWaitingIconResized : check.status === 'success' ?markerCheckSuccessIconResized : markerCheckFailedIconResized } key={'check_' + check.id} position={{lat: check.lat, lng: check.lng}} />),
                    )}
                    
                </this.CMap>
            </Fragment>
        );
    }
}

export default MapView;