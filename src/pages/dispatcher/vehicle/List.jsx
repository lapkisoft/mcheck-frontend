import React from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import vehicles from '../../../data/vehicles.json';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderVehicle = this.renderVehicle.bind(this);

        this.state = {vehicles};
    }

    renderVehicle(vehicle) {
        return (
            <div key={vehicle.id} className="vehicle">
                <div className="icon">
                    <Link to={`/vehicle-update/${vehicle.id}`}>
                        <img src={vehicle.avatar_uri} alt=""/>
                    </Link>
                </div>

                <div className="properties">
                    <div className="row">марка: <span>{vehicle.vendor}</span></div>
                    <div className="row">гос номер: <span>{vehicle.number}</span></div>
                    <div className="row">год выпуска: <span>{vehicle.year}</span></div>
                </div>

                <div className="controls">
                    <Link to={`/vehicle-delete/${vehicle.id}`}>
                        <img src="/img/icon-trash.png" alt=""/>
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        let vehicle_list = this.state.vehicles.map(this.renderVehicle);

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/" className="back-link"><i className="fa fa-arrow-left"/> Транспортные средства</Link>

                        <img src="/img/nav/icon-vehicle.png" alt=""/>
                    </nav>
                </header>

                <div className="vehicle-list">
                    {vehicle_list}
                </div>

                <Link to="/vehicle-create">
                    <Fab className="btn-float-add" aria-label="Add">
                        <AddIcon/>
                    </Fab>
                </Link>
            </div>
        );
    }
}