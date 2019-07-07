import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import vehicles from '../../../data/vehicles.json';

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

export default function({match}) {
    let vehicle_id = parseInt(`${match.params.id}`),
        vehicle    = vehicles.filter(({id}) => id === vehicle_id)[0];

    const classes             = useStyles();
    const [values, setValues] = React.useState({
        vendor: vehicle.vendor,
        number: vehicle.number,
        year:   vehicle.year
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
                    <Link to="/dispatcher/vehicles" className="back-link">
                        <i className="fa fa-arrow-left"/> Редактировать транспорт
                    </Link>

                    <img src="/img/nav/icon-add-vehicle.png" alt=""/>
                </nav>
            </header>

            <form action="" noValidate autoComplete="off">
                <section className="section-form">
                    <p className="help-block">Введите данные о транспортном средстве</p>

                    <TextField
                        id="vehicle-vendor-input"
                        label="Марка, модель ТС"
                        className={classes.textField}
                        value={values.vendor}
                        name="vendor"
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        id="vehicle-number-input"
                        label="Гос. номер"
                        className={classes.textField}
                        value={values.number}
                        name="number"
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        id="vehicle-year-input"
                        label="Год выпуска"
                        className={classes.textField}
                        value={values.year}
                        name="year"
                        onChange={handleChange}
                        margin="dense"
                    />
                </section>

                <div className="page-controls">
                    <Button
                        fullWidth
                        type="submit"
                        className="create">
                        Редактировать
                    </Button>
                </div>
            </form>
        </div>
    );
}