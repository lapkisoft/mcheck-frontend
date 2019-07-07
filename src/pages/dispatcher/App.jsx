import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import NotFound from '../NotFound.jsx';

import DispatcherIndex from './Index.jsx';
import RouteSheetView from './route-sheet/View.jsx';
import RouteSheetCreate from './route-sheet/Create.jsx';
import RouteSheetUpdate from './route-sheet/Update.jsx';
import RouteSheetList from './route-sheet/List.jsx';
import DriverList from './driver/List.jsx';
import DriverCreate from './driver/Create.jsx';
import DriverUpdate from './driver/Update.jsx';
import VehicleList from './vehicle/List.jsx';
import VehicleCreate from './vehicle/Create.jsx';
import VehicleUpdate from './vehicle/Update.jsx';
import MapView from '../MapView.jsx';

export default () => {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/" exact component={DispatcherIndex}/>
                    <Route path="/drivers" component={DriverList}/>
                    <Route path="/driver-create" component={DriverCreate}/>
                    <Route path="/driver-update/:id" component={DriverUpdate}/>
                    <Route path="/route-sheets" component={RouteSheetList}/>
                    <Route path="/route-sheet/:id" component={RouteSheetView}/>
                    <Route path="/route-sheet-create" component={RouteSheetCreate}/>
                    <Route path="/route-sheet-update/:id" component={RouteSheetUpdate}/>
                    <Route path="/vehicles" component={VehicleList}/>
                    <Route path="/vehicle-create" component={VehicleCreate}/>
                    <Route path="/vehicle-update/:id" component={VehicleUpdate}/>
                    <Route path="/map-page" component={MapView}/>
                    <Route component={NotFound}/>
                </Switch>
            </main>

            <footer>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"><img src="/img/icon-home.png" alt=""/></Link>
                        </li>
                        <li>
                            <Link to="/route-sheets"><img src="/img/icon-sheet.png" alt=""/></Link>
                        </li>
                        <li>
                            <Link to="/vehicles"><img src="/img/icon-bus.png" alt=""/></Link>
                        </li>
                        <li>
                            <Link to="/drivers"><img src="/img/icon-face.png" alt=""/></Link>
                        </li>
                        <li>
                            <Link to="/settings"><img src="/img/icon-settings.png" alt=""/></Link>
                        </li>
                    </ul>
                </nav>
            </footer>
        </Router>
    );
};
