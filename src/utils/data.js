import drivers from '../data/drivers.json';
import route_directions from '../data/route-directions.json';
import route_sheets_base from '../data/router-sheets.json';
import vehicles from '../data/vehicles.json';

let route_sheets = localStorage.getItem('route_sheets')
    ? JSON.parse(localStorage.getItem('route_sheets'))
    : route_sheets_base;

export {
    drivers,
    route_directions,
    route_sheets,
    vehicles
};
