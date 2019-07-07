import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../../../utils/format';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import {Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import route_sheets from '../../../data/router-sheets.json';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderRun    = this.renderRun.bind(this);
        this.handleChange = this.handleChange.bind(this);

        let sheet_id = parseInt(`${props.match.params.id}`),
            sheet    = route_sheets.filter(({id}) => id === sheet_id)[0];

        this.state = {
            sheet,
            complaints:           '',
            temperature:          '',
            pressure:             '',
            pulse:                '',
            alcohol_intoxication: false,
            drug_intoxication:    false,
            access_to_route:      false
        };
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

    handleChange(event) {
        let value = event.target.value;

        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }

        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        let sheet      = this.state.sheet,
            route_date = formatDate(sheet.runs[0].time),
            start_time = formatTime(sheet.runs[0].time),
            end_time   = formatTime(sheet.runs[sheet.runs.length - 1].time),
            checks     = [
                <div key={-2} className={`medic ${sheet.medic_check || ''}`}/>,
                <div key={-1} className={`mechanic ${sheet.mechanic_check || ''}`}/>,
                ...sheet.runs.filter(run => run.hasOwnProperty('check')).map((run, index) => {
                    return <div key={index} className={`medic ${run.check || ''}`}/>;
                })
            ];

        return (
            <div>
                <header>
                    <nav>
                        <Link to="/medic/route-sheets" className="back-link">
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

                <div className="white-blocks">
                    <div className="white">
                        <p>Чеклист проверки Водителя</p>
                    </div>

                    <form action="" noValidate autoComplete="off">
                        <div className="white">
                            <TextField
                                id="route-sheet-complaints-input"
                                label="Жалобы водителя"
                                name="complaints"
                                onChange={this.handleChange}
                                margin="dense"
                                multiline
                                fullWidth
                            />

                            <TextField
                                id="route-sheet-complaints-input"
                                label="Температура водителя"
                                name="temperature"
                                onChange={this.handleChange}
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="route-sheet-pressure-input"
                                label="Давление водителя"
                                name="pressure"
                                onChange={this.handleChange}
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="route-sheet-pulse-input"
                                label="Пульс водителя"
                                name="pulse"
                                onChange={this.handleChange}
                                margin="dense"
                                fullWidth
                            />

                            <FormGroup aria-label="alcohol_intoxication" name="alcohol_intoxication">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.alcohol_intoxication}
                                            onChange={this.handleChange}
                                            name="alcohol_intoxication"
                                            value={true}/>
                                    }
                                    className="full-width-label"
                                    label="Наличие признаков алкогольного опьянения"
                                    labelPlacement="start"/>
                            </FormGroup>

                            <FormGroup aria-label="drug_intoxication" name="drug_intoxication">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.drug_intoxication}
                                            onChange={this.handleChange}
                                            name="drug_intoxication"
                                            value={true}/>
                                    }
                                    className="full-width-label"
                                    label="Наличие признаков наркотического опьянения"
                                    labelPlacement="start"/>
                            </FormGroup>

                            <RadioGroup
                                aria-label="access_to_route"
                                className="radio-group"
                                row>
                                <FormControlLabel
                                    value={false}
                                    control={
                                        <Radio
                                            value={false}
                                            name="access_to_route"
                                            checked={this.state.access_to_route === 'false'}
                                            onChange={this.handleChange}
                                        />
                                    }
                                    label="Разрешить"/>
                                <FormControlLabel
                                    value={true}
                                    control={
                                        <Radio
                                            value={true}
                                            name="access_to_route"
                                            checked={this.state.access_to_route === 'true'}
                                            onChange={this.handleChange}
                                        />
                                    }
                                    label="Запретить"/>
                            </RadioGroup>
                        </div>

                        <br/>
                        <br/>

                        <div className="page-controls">
                            <Button
                                fullWidth
                                type="submit"
                                className="create">
                                Добавить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
