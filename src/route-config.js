import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeComponent from './components/Home/index';
import PomodoroComponent from './components/Pomodoro/index';
import MaskedInputComponent from './components/MaskedInput/index';
import JsonCsv from './components/JsonCsv/index';
import OneSecret from './components/Secret/index';
import ShowSecret from './components/ShowSecret/index';

export const routes = [
  {
    path: '/',
    component: HomeComponent,
    exact: true,
  },
  {
    path: '/pomodoro',
    component: PomodoroComponent,
    exact: true,
  },
  {
    path: '/masked-input',
    component: MaskedInputComponent,
    exact: true,
  },
  {
    path: '/json-csv',
    component: JsonCsv,
    exact: true,
  },
  {
    path: '/secret',
    component: OneSecret,
    exact: false,
  },
  {
    path: '/show-secret',
    component: ShowSecret,
    exact: false,
  },
];
