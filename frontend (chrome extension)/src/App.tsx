import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Settings } from './routes/Settings';
import { Home } from './routes/Home';

export const App = () => {
  return (
    <Switch>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
