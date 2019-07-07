import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

// main pages
import Index from './Index.jsx';
import NotFound from './NotFound.jsx';

// dispatcher interface
import DispatcherIndex from './dispatcher/Index.jsx';
import DispatcherRouteSheetView from './dispatcher/route-sheet/View.jsx';
import DispatcherRouteSheetCreate from './dispatcher/route-sheet/Create.jsx';
import DispatcherRouteSheetUpdate from './dispatcher/route-sheet/Update.jsx';
import DispatcherRouteSheetList from './dispatcher/route-sheet/List.jsx';
import DispatcherDriverList from './dispatcher/driver/List.jsx';
import DispatcherDriverCreate from './dispatcher/driver/Create.jsx';
import DispatcherDriverUpdate from './dispatcher/driver/Update.jsx';
import DispatcherVehicleList from './dispatcher/vehicle/List.jsx';
import DispatcherVehicleCreate from './dispatcher/vehicle/Create.jsx';
import DispatcherVehicleUpdate from './dispatcher/vehicle/Update.jsx';

// mechanic pages
import MechanicIndex from './mechanic/Index.jsx';
import MechanicRouteSheetView from './mechanic/route-sheet/View.jsx';
import MechanicRouteSheetList from './mechanic/route-sheet/List.jsx';

// medic pages
import MedicIndex from './medic/Index.jsx';
import MedicRouteSheetView from './medic/route-sheet/View.jsx';
import MedicRouteSheetList from './medic/route-sheet/List.jsx';

// police pages
import PoliceIndex from './police/Index.jsx';
import PoliceRouteSheetList from './police/route-sheet/List.jsx';
import PoliceRouteSheetView from './police/route-sheet/View.jsx';

export default class extends React.Component {
    render() {
        return (
            <Router>
                <main>
                    <Switch>
                        <Route path="/" exact component={Index}></Route>
                        <Route path="/map-page" component={Index}/>

                        <Route path="/dispatcher" exact component={DispatcherIndex}/>
                        <Route path="/dispatcher/drivers" component={DispatcherDriverList}/>
                        <Route path="/dispatcher/driver-create" component={DispatcherDriverCreate}/>
                        <Route path="/dispatcher/driver-update/:id" component={DispatcherDriverUpdate}/>
                        <Route path="/dispatcher/route-sheets" component={DispatcherRouteSheetList}/>
                        <Route path="/dispatcher/route-sheet/:id" component={DispatcherRouteSheetView}/>
                        <Route path="/dispatcher/route-sheet-create" component={DispatcherRouteSheetCreate}/>
                        <Route path="/dispatcher/route-sheet-update/:id" component={DispatcherRouteSheetUpdate}/>
                        <Route path="/dispatcher/vehicles" component={DispatcherVehicleList}/>
                        <Route path="/dispatcher/vehicle-create" component={DispatcherVehicleCreate}/>
                        <Route path="/dispatcher/vehicle-update/:id" component={DispatcherVehicleUpdate}/>

                        <Route path="/mechanic" exact component={MechanicIndex}/>
                        <Route path="/mechanic/route-sheets" component={MechanicRouteSheetList}/>
                        <Route path="/mechanic/route-sheet/:id" component={MechanicRouteSheetView}/>

                        <Route path="/medic" exact component={MedicIndex}/>
                        <Route path="/medic/route-sheets" component={MedicRouteSheetList}/>
                        <Route path="/medic/route-sheet/:id" component={MedicRouteSheetView}/>

                        <Route path="/police" exact component={PoliceIndex}/>
                        <Route path="/police/route-sheets" component={PoliceRouteSheetList}/>
                        <Route path="/police/route-sheet/:id" component={PoliceRouteSheetView}/>

                        <Route component={NotFound}/>
                    </Switch>
                </main>

                <Switch>
                    <Route path="/dispatcher">
                        <footer>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/dispatcher"><img src="/img/icon-home.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/dispatcher/route-sheets"><img src="/img/icon-sheet.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/dispatcher/vehicles"><img src="/img/icon-vehicle.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/dispatcher/drivers"><img src="/img/icon-face.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><img src="/img/icon-settings.png" alt=""/></Link>
                                    </li>
                                </ul>
                            </nav>
                        </footer>
                    </Route>

                    <Route path="/mechanic">
                        <footer>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/mechanic/"><img src="/img/icon-home.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/mechanic/route-sheets"><img src="/img/icon-sheet.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><img src="/img/icon-settings.png" alt=""/></Link>
                                    </li>
                                </ul>
                            </nav>
                        </footer>
                    </Route>

                    <Route path="/medic">
                        <footer>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/medic/"><img src="/img/icon-home.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/medic/route-sheets"><img src="/img/icon-sheet.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><img src="/img/icon-settings.png" alt=""/></Link>
                                    </li>
                                </ul>
                            </nav>
                        </footer>
                    </Route>

                    <Route path="/police">
                        <footer>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/police/route-sheets"><img src="/img/icon-sheet.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/police"><img src="/img/icon-map.png" alt=""/></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><img src="/img/icon-settings.png" alt=""/></Link>
                                    </li>
                                </ul>
                            </nav>
                        </footer>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
