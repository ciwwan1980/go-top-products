import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

const Home = () => {
  const topProducts = [...productsData].sort((a, b) => b.price - a.price).slice(0, 4);
  return (
    <div className="home">
      <div className="home-header">
        <h2 className="home-header-title">Welcome, visitor!</h2>
        <Link to="/products">
          <button className="home-header-nav">Go To Products</button>
        </Link>
      </div>

      <ul className="top-products">
        {topProducts.map(({ slug, id, name, price }) => {
          return (
            <Link to={`/products/${slug}`} key={id}>
              <li className="top">
                <h1 className="top-title">{name}</h1>
                <div className="top-price">{`$${price}`}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
