/* @refresh reload */
import { render } from 'solid-js/web';
import { Router  } from "solid-app-router";

import './index.css';
import App from './App';

const Main = () => {
    console.warn = function() {};
    console.log = function() {};
render(
    () => (
        <Router>
        <App />
        </Router>
    ),
    document.getElementById("root")
    );
}

Main();