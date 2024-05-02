// itemReducer.js

// Action Types
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

// Action Creators
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = (index, updatedItem) => ({
  type: UPDATE_ITEM,
  payload: { index, updatedItem },
});

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  payload: index,
});

// Initial State
const initialState = {
  items: [],
};

// Reducer
const itemReducer = (state = initialState, action) => {
  console.log("itemReducer", action.payload)
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case UPDATE_ITEM:
      const updatedItems = [...state.items];
      updatedItems[action.payload.index] = action.payload.updatedItem;
      return {
        ...state,
        items: updatedItems,
      };

    case DELETE_ITEM:
      const filteredItems = state.items.filter((_, index) => index !== action.payload);
      return {
        ...state,
        items: filteredItems,
      };

    default:
      return state;
  }
};

export default itemReducer;
