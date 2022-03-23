import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeComponent from './components/Home/index';
import PomodoroComponent from './components/Pomodoro/index';
import MaskedInputComponent from './components/MaskedInput/index';

export default class Routes extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/pomodoro" component={PomodoroComponent} />
            <Route
              exact
              path="/masked-input"
              component={MaskedInputComponent}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
