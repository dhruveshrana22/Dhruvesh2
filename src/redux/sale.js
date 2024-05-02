// saleReducer.js

// Action Types
const ADD_SALE = 'ADD_SALE';
const UPDATE_SALE = 'UPDATE_SALE';
const DELETE_SALE = 'DELETE_SALE';

// Action Creators
export const addSale = (sale) => ({
  type: ADD_SALE,
  payload: sale,
});

export const updateSale = (sale) => ({
  type: UPDATE_SALE,
  payload: sale,
});

export const deleteSale = (saleID) => ({
  type: DELETE_SALE,
  payload: saleID,
});

// Reducer
const initialState = {
  sales: [],
};

const saleReducer = (state = initialState, action) => {
  console.log("Sale Data Fromthe Sale bille",action.payload)
  switch (action.type) {
    case ADD_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };

    case UPDATE_SALE:
      return {
        ...state,
        sales: state.sales.map((sale) =>
          sale.saleID === action.payload.saleID ? action.payload : sale
        ),
      };

    case DELETE_SALE:
      return {
        ...state,
        sales: state.sales.filter((sale) => sale.saleID !== action.payload),
      };

    default:
      return state;
  }
};

export default saleReducer;
