import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import Room from './components/Room/Room'
import "./style.css"

function webrtcApp() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/lobby" component={Main} />
          <Route path="/room/:roomId" component={Room} />
        </Switch>
    </BrowserRouter>
  );
}


export default webrtcApp;
