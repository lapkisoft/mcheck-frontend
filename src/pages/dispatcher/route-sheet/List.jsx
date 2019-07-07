import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../../../utils/format';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import route_sheets from '../../../data/router-sheets.json';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderSheet = this.renderSheet.bind(this);

        this.state = {route_sheets};
    }

    renderSheet(item, index, routes) {
        let route_date = formatDate(item.runs[0].time),
            start_time = formatTime(item.runs[0].time),
            end_time   = formatTime(item.runs[item.runs.length - 1].time),
            show_date  = index === 0 || formatDate(routes[index - 1].runs[0].time) !== route_date,
            checks     = [
                <div className={`medic ${item.medic_check || ''}`}/>,
                <div className={`mechanic ${item.mechanic_check || ''}`}/>,
                ...item.runs.filter(run => run.hasOwnProperty('check')).map(run => {
                    return <div className={`medic ${run.check || ''}`}/>;
                })
            ];

        return (
            <Link to={`/route-sheet/${item.id}`} key={item.id} className="route-sheet">
                {show_date && <div className="route-date"><span>{route_date}</span></div>}

                <div className="header">
                    <div className="back">
                        <span>Серия: {item.series}</span>
                        <span>№: {item.number}</span>
                    </div>
                </div>

                <div className="content-short">
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
                    <div className="summary-checks">
                        {checks}
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
                        <Link to="/" className="back-link"><i className="fa fa-arrow-left"/> Путевые листы</Link>

                        <img src="/img/nav/icon-sheet.png" alt=""/>
                    </nav>
                </header>

                <div className="route-sheet-list">
                    {route_sheet_list}
                </div>

                <Link to="/route-sheet-create">
                    <Fab className="btn-float-add" aria-label="Add">
                        <AddIcon/>
                    </Fab>
                </Link>
            </div>
        );
    }
}