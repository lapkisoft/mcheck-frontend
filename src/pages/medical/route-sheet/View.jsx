import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {formatDate, formatTime} from '../../../utils/format';
import route_sheets from '../../../data/router-sheets';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderRun = this.renderRun.bind(this);

        let sheet_id = parseInt(`${props.match.params.id}`),
            sheet    = route_sheets.filter(({id}) => id === sheet_id)[0];

        this.state = {sheet};
    }

    renderRun(run, index) {
        return <div key={index} className="check">
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
        let sheet      = this.state.sheet,
            route_date = formatDate(sheet.runs[0].time),
            start_time = formatTime(sheet.runs[0].time),
            end_time   = formatTime(sheet.runs[sheet.runs.length - 1].time),
            checks     = [
                <div className={`medic ${sheet.medic_check || ''}`}/>,
                <div className={`mechanic ${sheet.mechanic_check || ''}`}/>,
                ...sheet.runs.filter(run => run.hasOwnProperty('check')).map(run => {
                    return <div className={`medic ${run.check || ''}`}/>;
                })
            ];

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/route-sheets" className="back-link">
                            <i className="fa fa-arrow-left"/> Путевой лист #{sheet.id}
                        </Link>

                        <img src="/img/nav/icon-sheet.png" alt=""/>
                    </nav>
                </header>

                <div className="route-sheet-list">
                    <div className="route-sheet">
                        <div className="header">
                            <div className="back">
                                <span>Серия: {sheet.series}</span>
                                <span>№: {sheet.number}</span>
                            </div>
                        </div>

                        <div className="content-short">
                            <p>
                                <img src="/img/icon-sheet-driver.png" alt="" className="icon"/>
                                <span>{sheet.driver_name}</span>
                            </p>
                            <p>
                                <img src="/img/icon-sheet-vehicle.png" alt="" className="icon"/>
                                <span>{sheet.vehicle_vendor} {sheet.vehicle_number}</span>
                            </p>
                            <div className="content-route-date">{route_date}</div>
                            <div className="route-info">
                                <div className="time-range">{start_time} - {end_time}</div>
                                <div className="point">{sheet.runs[0].name}</div>
                                <img src="/img/icon-arrow-right.png" alt=""/>
                                <div className="point">{sheet.runs[sheet.runs.length - 1].name}</div>
                            </div>
                            <div className="summary-checks">
                                {checks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
