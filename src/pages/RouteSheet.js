import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {formatDate, formatTime} from '../utils/format';
import route_sheets from '../data/router-sheets';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderRun = this.renderRun.bind(this);

        let route_id = parseInt(`${props.match.params.id}`),
            route    = route_sheets.filter(({id}) => id === route_id)[0];

        this.state = {route};
    }

    renderRun(run) {
        return <div className="check">
            <div className="datetime">
                <div className="time">{formatTime(run.time)}</div>
                <div className="date">{formatDate(run.time)}</div>
            </div>

            <div className="info">
                <div className="name">{run.name}</div>
                <div className="type">{run.type}</div>
            </div>

            {run.hasOwnProperty('check') && <div className={`status ${run.check || ''}`}/>}
        </div>;
    }

    render() {
        let route    = this.state.route,
            run_list = route.runs.map(this.renderRun);

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/route-sheets" className="back-link">
                            <i className="fa fa-arrow-left"/> Путевой лист #{route.id}
                        </Link>

                        <img src="/img/icon-sheet.png" alt=""/>
                    </nav>
                </header>

                <div className="route-sheet-list">
                    <div className="route-sheet">
                        <div className="header">
                            <span>Серия: {route.series}</span>
                            <span>Номер: {route.number}</span>
                        </div>

                        <div className="content">
                            <div className="vehicle-driver-info">
                                <div className="icon">
                                    <img src="/img/avatar-bus-driver.png" alt=""/>
                                </div>

                                <div className="name">{route.vehicle_driver_name}</div>

                                <div className="status"/>
                            </div>

                            <div className="vehicle-info">
                                <div className="icon">
                                    <img src="/img/avatar-bus.png" alt=""/>
                                </div>

                                <div className="name">
                                    {route.vehicle_vendor}
                                    <br/>
                                    <span>гос номер:</span> {route.vehicle_number}
                                </div>

                                <div className="status"/>
                            </div>

                            <div className="checking-line">
                                {run_list}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-controls">
                    <Button
                        component={Link}
                        to={`/route-sheet-update/${route.id}`}
                        fullWidth
                        className="update">
                        Редактировать
                    </Button>

                    <Button
                        component={Link}
                        to={`/route-sheet-update/${route.id}`}
                        fullWidth
                        className="delete">
                        Удалить
                    </Button>
                </div>
            </div>
        );
    }
}
