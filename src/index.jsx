/* @refresh reload */
import { render } from 'solid-js/web';
import { Router  } from "solid-app-router";

import './index.css';
import App from './App';

const Main = () => {
    
    if (!window.console || Object.keys(window.console).length === 0) {
        window.console = {
          log: function() {},
          info: function() {},
          error: function() {},
          warn: function() {}
        };
      }
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