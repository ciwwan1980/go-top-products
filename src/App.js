import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="logo"></div>

        <Switch>
          <Route path="/products/:slug" component={ProductDetails} />
          <Route path="/products" component={Products} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
