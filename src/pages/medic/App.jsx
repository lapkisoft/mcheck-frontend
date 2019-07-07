import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import NotFound from '../NotFound.jsx';

import DispatcherIndex from './Index.jsx';
import RouteSheetView from './route-sheet/View.jsx';
import RouteSheetList from './route-sheet/List.jsx';

export default () => {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/" exact component={DispatcherIndex}/>
                    <Route path="/route-sheets" component={RouteSheetList}/>
                    <Route path="/route-sheet/:id" component={RouteSheetView}/>
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
                            <Link to="/settings"><img src="/img/icon-settings.png" alt=""/></Link>
                        </li>
                    </ul>
                </nav>
            </footer>
        </Router>
    );
};
