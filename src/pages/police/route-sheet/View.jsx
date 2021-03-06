import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../../../utils/format';
import {route_sheets} from '../../../utils/data';

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
        let sheet    = this.state.sheet,
            run_list = sheet.runs.map(this.renderRun);

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/police/route-sheets" className="back-link">
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

                        <div className="content">
                            <div className="vehicle-driver-info">
                                <div className="icon">
                                    <img src="/img/avatar-driver.png" alt=""/>
                                </div>

                                <div className="name">{sheet.driver_name}</div>

                                <div className={`status ${sheet.medic_check || ''}`}/>
                            </div>

                            <div className="vehicle-info">
                                <div className="icon">
                                    <img src="/img/avatar-vehicle.png" alt=""/>
                                </div>

                                <div className="name">
                                    {sheet.vehicle_vendor}
                                    <br/>
                                    <span>гос номер:</span> {sheet.vehicle_number}
                                </div>

                                <div className={`status ${sheet.mechanic_check || ''}`}/>
                            </div>

                            <div className="checking-line">
                                {run_list}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="white-blocks">
                    <div className="white">
                        <div className="medic-wrapper">
                            <div className="img-wrapper">
                                <img src="/img/avatar-medic.png" alt=""/>
                            </div>

                            <div className="info">
                                <div className="name">{ sheet.medic_name }</div>
                                <div className="type">Фельдшер</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="white-blocks">
                    <div className="white">
                        <div className="mechanic-wrapper">
                            <div className="img-wrapper">
                                <img src="/img/avatar-mechanic.png" alt=""/>
                            </div>

                            <div className="info">
                                <div className="name">{ sheet.mechanic_name }</div>
                                <div className="type">Фельдшер</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
