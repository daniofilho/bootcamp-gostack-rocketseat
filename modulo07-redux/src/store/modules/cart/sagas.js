import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import {
  addToCartSuccess,
  updateAmountRequest,
  updateAmountSuccess,
} from './actions';

// generator => * = async function .. | yield = await
function* addToCart({ id }) {
  // select é necessário para acessar o state
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountRequest(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// cadastro dos listeners
export default all([
  // Caso o usuário clique novamente no botão antes do request terminar,
  // ele ignora os requests anteriores e usa apenas o ultimo
  // existe o takeEvery também
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
