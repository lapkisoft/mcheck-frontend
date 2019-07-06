import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../utils/format';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import route_sheets from '../data/router-sheets.json';

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
            show_date  = index === 0 || formatDate(routes[index - 1].runs[0].time) !== route_date;

        return (
            <Link to={`/route-sheet/${item.id}`} key={item.id} className="route-sheet">
                {show_date && <div className="route-date"><span>{route_date}</span></div>}

                <div className="header">
                    <span>#{item.id}</span>
                    <span>Серия: {item.series}</span>
                    <span>Номер: {item.number}</span>
                </div>

                <div className="content-short">
                    <p>{item.driver_name}</p>
                    <p>{item.vehicle_vendor} {item.vehicle_number}</p>
                    <div className="route-info">
                        <div className="time-range">{start_time} - {end_time}</div>
                        <div className="point">{item.runs[0].name}</div>
                        <i className="fa fa-arrow-right"/>
                        <div className="point">{item.runs[item.runs.length - 1].name}</div>
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