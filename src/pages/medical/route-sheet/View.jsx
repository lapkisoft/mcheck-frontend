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
            end_time   = formatTime(sheet.runs[sheet.runs.length - 1].time);

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
                            <span>#{sheet.id}</span>
                            <span>Серия: {sheet.series}</span>
                            <span>Номер: {sheet.number}</span>
                        </div>

                        <div className="content">
                            <p>{sheet.driver_name}</p>
                            <p>{sheet.vehicle_vendor} {sheet.vehicle_number}</p>
                            <div className="route-info">
                                <div className="time-range">{start_time} - {end_time}</div>
                                <div className="point">{sheet.runs[0].name}</div>
                                <i className="fa fa-arrow-right"/>
                                <div className="point">{sheet.runs[sheet.runs.length - 1].name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
