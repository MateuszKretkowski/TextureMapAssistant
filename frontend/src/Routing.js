import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Komponenty, które będziemy renderować


function App() {
  return (
    <Router>
        <Switch>
          {/* Definiowanie tras */}
          <Route exact path="/" component={App} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
    </Router>
  );
}

export default App;
