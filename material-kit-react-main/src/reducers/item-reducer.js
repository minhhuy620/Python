import { itemType } from "../constants/ActionConstants";
const initialState = {
  data: [],
  success: null,
  message: "",
  isAction: false,
  isLoading: false,
  isAction: false,
  data_by_id: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case itemType.GETALL_REQUEST:
      return { ...state, isLoading: true, isAction: false };
    case itemType.GETALL_SUCCESS:
      return { ...state, data: action.payload.data, isLoading: false };
    case itemType.GETALL_ERROR:
      return { ...state, data: null, isLoading: false };
    case itemType.GETBYID_REQUEST:
      return { ...state, data_by_id: null, success: null };
    case itemType.GETBYID_SUCCESS:
      return { ...state, success: true, data_by_id: action.payload.data };
    case itemType.GETBYID_ERROR:
      return { ...state, success: false, data_by_id: null, message: "error" };
    case itemType.ADD_REQUEST:
      return { ...state, success: null };
    case itemType.ADD_SUCCESS:
      return { ...state, success: true, message: "Success" };
    case itemType.ADD_ERROR:
      return { ...state, success: false, message: "Fail" };
    case itemType.DELETE_REQUEST:
      return { ...state, success: null, isLoading: true };
    case itemType.DELETE_SUCCESS:
      return { ...state, success: true, isLoading: false };
    case itemType.DELETE_ERROR:
      return { ...state, success: false, isLoading: false };
    default:
      return state;
  }
};
