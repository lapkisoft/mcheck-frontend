import React from 'react';
import ReactDOM from 'react-dom';

import 'assets/scss/material-kit-react.scss?v=1.7.0';

import {Settings} from 'luxon';
import App from './App';
import './css/layout.scss';
import './css/pages.scss';

Settings.defaultLocale = 'ru';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
