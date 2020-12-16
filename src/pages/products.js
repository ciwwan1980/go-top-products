import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

const sortProducts = (products, sortingOrder) => {
  if (sortingOrder === 'asc') return [...products].sort((a, b) => a.price - b.price);
  if (sortingOrder === 'dsc') return [...products].sort((a, b) => b.price - a.price);
  return [...products];
};

class Products extends React.Component {
  state = {
    initialArray: [...productsData],
    productsArray: [...productsData],
    filterTerm: '',
  };

  componentDidMount() {
    let parse = queryString.parse(this.props.location.search);

    this.setState({
      productsArray: sortProducts(this.state.productsArray, parse.sort),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      let parse = queryString.parse(this.props.location.search);
      this.setState({
        productsArray: parse.sort
          ? sortProducts(this.state.productsArray, parse.sort)
          : this.state.initialArray,
      });
    }
  }

  setSortingOrder = (order = '') => {
    this.props.history.replace({
      pathname: '/products',
      search: order ? `?sort=${order}` : '',
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      filterTerm: e.target.value,
    });
  };

  render() {
    const parse = queryString.parse(this.props.location.search);
    console.log(parse);
    return (
      <>
        <div className="sort">
          <button name="reset" className="sort-button reset" onClick={() => this.setSortingOrder()}>
            Reset
          </button>
          <button name="asc" className="sort-button" onClick={() => this.setSortingOrder('asc')}>
            Sort <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button name="dsc" className="sort-button" onClick={() => this.setSortingOrder('dsc')}>
            Sort <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>

        <label htmlFor="filter">Filter by name or description</label>
        <input type="text" name="filter" id="filter" onChange={this.onChangeHandler} />
        <ul className="products">
          <div className="title">
            <Link to="/">
              <button className="move">
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </Link>
            <h1>
              Products
              {parse.sort === 'asc' ? (
                <span>Ascending</span>
              ) : parse.sort === 'dsc' ? (
                <span>Descending</span>
              ) : (
                ''
              )}
            </h1>
          </div>
          <div className="products-header">
            <div>Name</div>
            <div>Description</div>
            <div>
              Price
              {parse.sort === 'asc' ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : parse.sort === 'dsc' ? (
                <FontAwesomeIcon icon={faArrowDown} />
              ) : (
                ''
              )}
            </div>
          </div>

          {this.state.productsArray
            .filter(
              (product) =>
                product.name.toLowerCase().includes(this.state.filterTerm.toLowerCase()) ||
                product.shortDescription
                  .toLowerCase()
                  .includes(this.state.filterTerm.toLowerCase()),
            )
            .map(({ name, price, id, slug, shortDescription }, i) => {
              return (
                <Link to={`/products/${slug}`} key={id}>
                  <li className="product">
                    <div className="product-name">{name}</div>
                    <div className="product-description">{shortDescription}</div>
                    <div className="product-price">{`$ ${price}`}</div>
                  </li>
                </Link>
              );
            })}
        </ul>
      </>
    );
  }
}

export default Products;
