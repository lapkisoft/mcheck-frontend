import React from 'react';
import ReactDOM from 'react-dom';

import {Settings} from 'luxon';
import App from './pages/App.jsx';
import './css/layout.scss';
import './css/pages.scss';

Settings.defaultLocale = 'ru';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
