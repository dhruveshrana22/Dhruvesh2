// businessActions.js
export const updateBusinessName = (name) => ({
  type: 'UPDATE_BUSINESS_NAME',
  payload: name,
});



// businessReducer.js
const initialState = {
  businessName: '',
  // other business-related fields can be added here
};

const businessReducer = (state = initialState, action) => {
  console.log("ActionData",action.payload)
  switch (action.type) {
    case 'UPDATE_BUSINESS_NAME':
      return {
        ...state,
        businessName: action.payload,
      };
    // other cases for handling additional fields can be added here

    default:
      return state;
  }
};

export default businessReducer;
