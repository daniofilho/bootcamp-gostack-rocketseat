export default function cart(state = [], action) {
  // Como todo reducer recebe um dispatch, é necessário verifica se o dispatch é relacionado a esse item mesmo
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    // Não é daqui, então retorna o state normal
    default:
      return state;
  }
}
