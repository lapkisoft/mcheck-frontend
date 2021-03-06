import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';

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
        name:            '',
        passport_number: '',
        phone:           ''
    });

    function handleChange(e) {
        setValues({
            ...values,

            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            <header>
                <nav>
                    <Link to="/dispatcher/drivers" className="back-link"><i className="fa fa-arrow-left"/> Регистрация водителя</Link>

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
                        Добавить
                    </Button>
                </div>
            </form>
        </div>
    );
}