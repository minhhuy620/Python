import { userType } from "../constants/ActionConstants";

const initialState = { data: [], success: false, data_by_id: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GETALL_REQUEST":
      return { ...state, success: false };
    case "GETALL_SUCCESS":
      return { ...state, data: action.payload.data };
    case "GETALL_ERROR":
      return { ...state, data: [], success: false };
    case userType.GETBYID_REQUEST:
      return { ...state, data_by_id: null, success: null };
    case userType.GETBYID_SUCCESS:
      return { ...state, success: true, data_by_id: action.payload.data };
    case userType.GETBYID_ERROR:
      return { ...state, success: false, data_by_id: null, message: "error" };
    default:
      return state;
  }
};
