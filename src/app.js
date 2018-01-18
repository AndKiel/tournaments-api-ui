import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/navigation';
import Home from './pages/home';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
