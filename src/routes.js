import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeComponent from './components/Home/index';
import PomodoroComponent from './components/Pomodoro/index';
import MaskedInputComponent from './components/MaskedInput/index';
import JsonCsv from './components/JsonCsv/index';
import { routes } from './route-config';
const elements = routes.map((route) => <Route key={route.path} {...route} />);

export default class Routes extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>{elements}</Switch>
        </Router>
      </React.Fragment>
    );
  }
}
