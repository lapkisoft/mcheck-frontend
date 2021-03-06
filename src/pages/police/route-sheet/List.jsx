import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../../../utils/format';
import {route_sheets} from '../../../utils/data';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderSheet = this.renderSheet.bind(this);

        this.state = {route_sheets};
    }

    renderSheet(item, index, routes) {
        let route_date        = formatDate(item.runs[0].time),
            start_time        = formatTime(item.runs[0].time),
            end_time          = formatTime(item.runs[item.runs.length - 1].time),
            show_date         = index === 0 || formatDate(routes[index - 1].runs[0].time) !== route_date,
            checks            = [
                <div key={-2} className={`medic ${item.medic_check || ''}`}/>,
                <div key={-1} className={`mechanic ${item.mechanic_check || ''}`}/>,
                ...item.runs.filter(run => run.hasOwnProperty('check')).map((run, index) => {
                    return <div key={index} className={`medic ${run.check || ''}`}/>;
                })
            ],
            police_has_status = item.medic_check !== null || item.mechanic_check !== null,
            police_is_danger  = item.medic_check === 'danger' || item.mechanic_check === 'danger';

        console.log(item);

        police_is_danger = police_is_danger || item.runs.filter(({check}) => check === 'danger').length > 0;

        return (
            <Link to={`/police/route-sheet/${item.id}`} key={item.id} className="route-sheet">
                {show_date && <div className="route-date"><span>{route_date}</span></div>}

                <div className="header">
                    <div className="back">
                        <span>Серия: {item.series}</span>
                        <span>№: {item.number}</span>
                    </div>
                </div>

                <div className="content-short">
                    {police_has_status && <div className={`police-status ${police_is_danger ? 'danger' : 'success'}`}/>}

                    <p>
                        <img src="/img/icon-sheet-driver.png" alt="" className="icon"/>
                        <span>{item.driver_name}</span>
                    </p>

                    <p>
                        <img src="/img/icon-sheet-vehicle.png" alt="" className="icon"/>
                        <span>{item.vehicle_vendor} {item.vehicle_number}</span>
                    </p>

                    <div className="route-info">
                        <div className="time-range">{start_time} - {end_time}</div>
                        <div className="point">{item.runs[0].name}</div>
                        <img src="/img/icon-arrow-right.png" alt=""/>
                        <div className="point">{item.runs[item.runs.length - 1].name}</div>
                    </div>

                    <div className="sheet-controls">
                        <Link to="/police" className="map-link">
                            <img src="/img/icon-map-small.png" alt=""/>
                            <span>смотреть на карте</span>
                        </Link>
                        <div className="summary-checks">
                            {checks}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    render() {
        let route_sheet_list = this.state.route_sheets.map(this.renderSheet);

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/police" className="back-link"><i className="fa fa-arrow-left"/> Путевые листы</Link>

                        <img src="/img/nav/icon-sheet.png" alt=""/>
                    </nav>
                </header>

                <div className="route-sheet-list">
                    {route_sheet_list}
                </div>
            </div>
        );
    }
}