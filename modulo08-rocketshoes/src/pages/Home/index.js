/* eslint-disable react/state-in-constructor */
//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
i; //mport { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';

//class Home extends Component {
export default function Home() {
  /*
  state = {
    products: [],
  };*/
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  /*
  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }*/
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    }
    loadProducts();
  }, []); // [] executa apenas uma vez, sem escutar nenhuma variável

  // Action que vai disparar para o reducer avisando que tem coisa nova
  function handleAddProduct(id) {
    //const { addToCartRequest } = this.props;

    // Todo reducer vai receber esse dispatch
    dispatch(CartActions.addToCartRequest(id));
  }

  //render() {
  //const { products } = this.state;
  //const { amount } = this.props;
  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
  //}
}

/*
// Convertendo states em props para o componente
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

// Convertendo os dispatches em props pro componente
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home); */
