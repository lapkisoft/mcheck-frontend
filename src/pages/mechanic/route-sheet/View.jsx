import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../../../utils/format';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import {Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {route_sheets} from '../../../utils/data';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderRun    = this.renderRun.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit     = this.onSubmit.bind(this);

        let sheet_id = parseInt(`${props.match.params.id}`),
            sheet    = route_sheets.filter(({id}) => id === sheet_id)[0];

        this.state = {
            sheet,
            access_to_route: false,
            checkbox_01:     false,
            checkbox_02:     false,
            checkbox_03:     false,
            checkbox_04:     false,
            checkbox_05:     false,
            checkbox_06:     false,
            checkbox_07:     false,
            checkbox_08:     false,
            checkbox_09:     false,
            checkbox_10:     false,
            checkbox_11:     false,
            checkbox_12:     false
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

    onSubmit(e) {
        e.preventDefault();

        let access = e.target.querySelector('[name="access_to_route"]:checked'),
            value  = null;

        if (access) {
            value = access.value === 'true' ? 'success' : 'danger';
        }

        for (let route_sheet of route_sheets) {
            if (route_sheet.id === this.state.sheet.id) {
                route_sheet.mechanic_check = value;
            }
        }

        localStorage.setItem('route_sheets', JSON.stringify(route_sheets));

        this.props.history.push('/mechanic/route-sheets');
        window.scrollTo(0, 0);
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
                        <Link to="/mechanic/route-sheets" className="back-link">
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
                        <p>Чеклист проверки Транспортного Средства</p>
                    </div>

                    <form action="" noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_01" name="checkbox_01">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="1. Общее техническое состояние"
                                        labelPlacement="start"/>

                                    <p>Возраст ТС</p>
                                    <p>Диагностическая карта ТО</p>
                                    <p>Система полного привода</p>
                                    <p>Подтеки жидкостей</p>
                                    <p>Прочие неисправности</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_02" name="checkbox_02">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="2. Внешние световые приборы"
                                        labelPlacement="start"/>

                                    <p>Количество, цвет, расположение</p>
                                    <p>Исправность в работе</p>
                                    <p>Маячок/Повторитель стоп-сигнала</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="3. Стекла"
                                        labelPlacement="start"/>

                                    <p>Стекла, предусмотренные конструкцией ТС</p>
                                    <p>Трещины на стекле в зоне работы стеклоочистителя</p>
                                    <p>Предметы, ограничивающие обзор с места водителя (Тонировочная пленка, шторки и т.п.)</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="4. Звуковые сигналы"
                                        labelPlacement="start"/>

                                    <p>Звуковой сигнал</p>
                                    <p>Автоматический звуковой сигнал заднего хода</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="5. Колеса и шины"
                                        labelPlacement="start"/>

                                    <p>Установка различных шин на одну ось</p>
                                    <p>Остаточная высота протектора</p>
                                    <p>Внешние повреждения шин (пробои, порезы и т.п.)</p>
                                    <p>Запасное колесо</p>
                                    <p>Болты (гайки) крепления колёс</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="6. Ремни безопасности"
                                        labelPlacement="start"/>

                                    <p>Ремни безопасности на всех сидениях</p>
                                    <p>Исправность инерционных механизмов натяжения</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="7. Запорные механизмы"
                                        labelPlacement="start"/>

                                    <p>Запоры бортов грузовой платформы/крепление груза</p>
                                    <p>Пробки топливных ёмкостей</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="8. Кабина и салон"
                                        labelPlacement="start"/>

                                    <p>Механизм открытия/закрытия дверей</p>
                                    <p>Система отопления кабины/салона</p>
                                    <p>Система связи с водителем</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="9. Зеркала заднего вида"
                                        labelPlacement="start"/>

                                    <p>Регулируемые зеркала заднего вида (Л+П)</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="10. БСМТС / Тахограф / Регистратор"
                                        labelPlacement="start"/>

                                    <p>Бортовая система мониторинга ТС</p>
                                    <p>Двухсторонний видео регистратор</p>
                                    <p>Тахограф</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="11. Аварийное оборудование"
                                        labelPlacement="start"/>

                                    <p>Огнетушитель</p>
                                    <p>Аптечка</p>
                                    <p>Знак аварийной остановки</p>
                                    <p>Светоотражающий жилет</p>
                                    <p>Противооткатные упоры (2 шт.)</p>
                                    <p>Передние и задние буксировочные проушины</p>
                                    <p>Искрогаситель</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white">
                            <div className="checkbox-group">
                                <FormGroup aria-label="checkbox_03" name="checkbox_03">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alcohol_intoxication}
                                                onChange={this.handleChange}
                                                name="alcohol_intoxication"
                                                value={true}/>
                                        }
                                        className="full-width-label"
                                        label="12. Документы водителя"
                                        labelPlacement="start"/>

                                    <p>Водительское удостоверение (соответствие категории)</p>
                                    <p>Свидетельство о регистрации ТС</p>
                                    <p>Путевой лист/ТТН/Разрешение ОП/КГГ</p>
                                    <p>Сертификат Защитного (зимнего) вождения</p>
                                    <p>Полис ОСАГО</p>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="white mechanic-form-group">
                            <div className="checkbox-group">
                                <div className="checkbox-group-title">Допустить ТС к рейсу?</div>

                                <RadioGroup
                                    aria-label="access_to_route"
                                    className="radio-group"
                                    row>
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
                                        label="Разрешить"/>
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
                                        label="Запретить"/>
                                </RadioGroup>
                            </div>
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
