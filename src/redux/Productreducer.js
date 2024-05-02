// actions.js
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

// action creators.js
export const addProduct = (productName, price) => ({
  type: ADD_PRODUCT,
  payload: {
    productName,
    price,
  },
});

export const updateProduct = (productId, productName, price) => ({
  type: UPDATE_PRODUCT,
  payload: {
    productId,
    productName,
    price,
  },
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: {
    productId,
  },
});

// reducer.js
const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          {
            productId: state.products.length + 1,
            productName: action.payload.productName,
            price: action.payload.price,
          },
        ],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.productId
            ? { ...product, productName: action.payload.productName, price: action.payload.price }
            : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload.productId
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
