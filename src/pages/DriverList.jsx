import React from 'react';
import {Link} from 'react-router-dom';
import drivers from '../data/drivers.json';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/core/SvgIcon/SvgIcon';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderDriver = this.renderDriver.bind(this);

        this.state = {drivers};
    }

    renderDriver(driver, index) {
        return (
            <Link to={`/driver/${driver.id}`} key={driver.id} className="driver">
                <div className="icon">
                    <Link to={`/driver/${driver.id}`}>
                        <img src="/img/avatar-driver.png" alt=""/>
                    </Link>
                </div>

                <div className="name">
                    <Link to={`/driver/${driver.id}`}>
                        {driver.name}
                    </Link>
                </div>

                <div className="controls">
                    <Link to={`/driver-delete/${driver.id}`}>
                        <img src="/img/icon-trash.png" alt=""/>
                    </Link>
                </div>
            </Link>
        );
    }

    render() {
        let driver_list = this.state.drivers.map(this.renderDriver);

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/" className="back-link"><i className="fa fa-arrow-left"/> Водители</Link>

                        <img src="/img/nav/icon-person.png" alt=""/>
                    </nav>
                </header>

                <div className="driver-list">
                    {driver_list}
                </div>

                <Link to="/driver-create">
                    <Fab className="btn-float-add" aria-label="Add">
                        <AddIcon/>
                    </Fab>
                </Link>
            </div>
        );
    }
}