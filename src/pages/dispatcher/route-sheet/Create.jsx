import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Button} from '@material-ui/core';
import drivers from '../../../data/drivers.json';
import vehicles from '../../../data/vehicles.json';
import route_destinations from '../../../data/route-directions.json';

const useStyles = makeStyles(theme => ({
    container:   {
        display:  'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        width: '100%'
    },
    textField:   {
        width: '100%'
    },
    dense:       {
        marginTop: 22
    },
    menu:        {
        width: 200
    }
}));

export default function() {
    const classes             = useStyles();
    const [values, setValues] = React.useState({
        series:       '',
        number:       '',
        driver_id:    '',
        vehicle_id:   '',
        direction_id: ''
    });

    let vehicle_driver_list    = drivers.map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>),
        vehicle_list           = vehicles.map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>),
        route_destination_list = route_destinations.map(({id, departure_name, destination_name, is_disabled = false}) => {
            return <MenuItem key={id}
                             value={id}
                             disabled={is_disabled}>
                {departure_name}
                <span className="arrow-right"/>
                {destination_name}
            </MenuItem>;
        });

    function handleChange(event) {
        setValues({
            ...values,

            [event.target.name]: event.target.value
        });
    }

    return (
        <div>
            <header>
                <nav>
                    <Link to="/dispatcher/route-sheets" className="back-link"><i className="fa fa-arrow-left"/> Создание путевого листа</Link>

                    <img src="/img/nav/icon-add-vehicle.png" alt=""/>
                </nav>
            </header>

            <form action="" noValidate autoComplete="off">
                <section className="section-form">
                    <p className="help-block">Текст-подсказка для самых одаренных. Может даже в 2 предложения</p>

                    <TextField
                        id="route-sheet-series-input"
                        label="Серия путевого листа"
                        className={classes.textField}
                        value={values.series}
                        name="series"
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        id="route-sheet-number-input"
                        label="Номер путевого листа"
                        className={classes.textField}
                        value={values.number}
                        name="number"
                        onChange={handleChange}
                        margin="dense"
                    />

                    <FormControl className={classes.formControl} margin="dense">
                        <InputLabel htmlFor="route-driver-id-input">Водитель</InputLabel>
                        <Select
                            value={values.driver_id}
                            onChange={handleChange}
                            inputProps={{
                                name: 'driver_id',
                                id:   'route-driver-id-input'
                            }}>
                            {vehicle_driver_list}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} margin="dense">
                        <InputLabel htmlFor="route-vehicle-id-input">Транспорт</InputLabel>
                        <Select
                            value={values.vehicle_id}
                            onChange={handleChange}
                            inputProps={{
                                name: 'vehicle_id',
                                id:   'route-vehicle-id-input'
                            }}>
                            {vehicle_list}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} margin="dense">
                        <InputLabel htmlFor="route-direction-id-input">Направление</InputLabel>
                        <Select
                            value={values.direction_id}
                            onChange={handleChange}
                            inputProps={{
                                name: 'direction_id',
                                id:   'route-direction-id-input'
                            }}>
                            {route_destination_list}
                        </Select>
                    </FormControl>
                </section>

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
    );
}