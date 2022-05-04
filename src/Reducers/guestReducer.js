import { SIGNIN_GUEST, ADD_TO_CART, MENU_OPTION } from "../Actions/types";
let guestDefault = {
  name: null,
  phone: null,
  email: null,
  buinessname: null,
};
const guestReducer = (state = { data: guestDefault }, action) => {
  switch (action.type) {
    case SIGNIN_GUEST:
      return {
        ...state,
        data: { ...action.payload },
      };
    case ADD_TO_CART:
      return {
        ...state,
        data: { ...action.payload },
      };
    default:
      return state;
  }
};

export default guestReducer;
