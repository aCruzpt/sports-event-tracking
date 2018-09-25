import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import store from './store';
import { initWebSocket } from "./websocket";

import AppRoutes from "./AppRoutes";

initWebSocket(store);
ReactDOM.render(
    <Provider store={store}>
        <AppRoutes/>
    </Provider>,
    document.getElementById('root'));
