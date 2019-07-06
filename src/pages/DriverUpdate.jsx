import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import drivers from '../data/drivers.json';

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
    let driver_id = parseInt(`${match.params.id}`),
        driver    = drivers.filter(({id}) => id === driver_id)[0];

    const classes             = useStyles();
    const [values, setValues] = React.useState({
        name:            driver.name,
        passport_number: driver.passport_number,
        phone:           driver.phone
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
                    <Link to="/drivers" className="back-link"><i className="fa fa-arrow-left"/> Редактирование водителя</Link>

                    <img src="/img/nav/icon-add-person.png" alt=""/>
                </nav>
            </header>

            <form action="" noValidate autoComplete="off">
                <section className="section-form">
                    <p className="help-block">Введите данные о водителе</p>

                    <TextField
                        id="driver-name-input"
                        label="ФИО"
                        className={classes.textField}
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        id="driver-passport-number-input"
                        label="Серия/номер паспорта"
                        className={classes.textField}
                        value={values.passport_number}
                        name="passport_number"
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        id="driver-phone-input"
                        label="Номер телефона"
                        className={classes.textField}
                        value={values.phone}
                        name="phone"
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