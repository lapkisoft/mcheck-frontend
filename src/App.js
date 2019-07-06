import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import NotFound from './pages/NotFound';

import Index from './pages/Index';
import RouteSheet from './pages/RouteSheet';
import RouteSheetList from './pages/RouteSheetList';
import BusDrivers from './pages/BusDrivers';
import Vehicles from './pages/Vehicles';
import MapPage from './views/MapPage/MapPage.jsx';

export default () => {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/bus-drivers" component={BusDrivers}/>
                    <Route path="/route-sheets" component={RouteSheetList}/>
                    <Route path="/route-sheet/:id" component={RouteSheet}/>
                    <Route path="/vehicles" component={Vehicles}/>
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
                            <Link to="/bus-drivers"><img src="/img/icon-face.png" alt=""/></Link>
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
