import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import NotFound from './pages/NotFound.jsx';

import Index from './pages/Index.jsx';
import RouteSheet from './pages/RouteSheet.jsx';
import RouteSheetCreate from './pages/RouteSheetCreate.jsx';
import RouteSheetUpdate from './pages/RouteSheetUpdate.jsx';
import RouteSheetList from './pages/RouteSheetList.jsx';
import DriverList from './pages/DriverList.jsx';
import VehicleList from './pages/VehicleList.jsx';
import MapPage from './views/MapPage/MapPage.jsx';

export default () => {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/drivers" component={DriverList}/>
                    <Route path="/route-sheets" component={RouteSheetList}/>
                    <Route path="/route-sheet/:id" component={RouteSheet}/>
                    <Route path="/route-sheet-create" component={RouteSheetCreate}/>
                    <Route path="/route-sheet-update/:id" component={RouteSheetUpdate}/>
                    <Route path="/vehicles" component={VehicleList}/>
                    <Route path="/map-page" component={MapPage}/>
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
