import { retrieveItems, retrieveItemId,addItem, deleteItem } from "../services/axios";

export const GetAllItems = (router) => async (dispatch) => {
  dispatch({ type: "GETALL_ITEM_REQUEST" });
  return await retrieveItems(router)
    .then(function (response) {
      dispatch({ type: "GETALL_ITEM_SUCCESS", payload: response });
    })
    .catch(function (response) {
      dispatch({ type: "GETALL_ITEM_ERROR", payload: response });
    });
};
export const GetItemById = (router, id) => async (dispatch) => {
  try {
    dispatch({ type: "GETBYID_REQUEST" });
    retrieveItemId(router, id)
      .then(function (response) {
        dispatch({ type: "GETBYID_SUCCESS", payload: response });
      })
      .catch(function (response) {
        dispatch({ type: "GETBYID_ERROR", payload: response });
      });
  } catch (error) {
    dispatch({ type: "GETBYID_ERROR", payload: error });
  }
};
export const InsertItem = (id,data) => async (dispatch) => {
  dispatch({ type: "ADD_ITEM_REQUEST" });
  return await addItem(id, data)
    .then(function (response) {
      if (response) {
        dispatch({ type: "ADD_ITEM_SUCCESS", payload: response });
      } else {
        dispatch({ type: "ADD_ITEM_ERROR", payload: response });
      }
    })
    .catch(function (response) {
      dispatch({ type: "ADD_ITEM_ERROR", payload: response });
    });
};
export const DeleteItem = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_ITEM_REQUEST" });
  return await deleteItem(id)
    .then(function (response) {
      dispatch({ type: "DELETE_ITEM_SUCCESS", payload: response });
    })
    .catch(function (response) {
      dispatch({ type: "DELETE_ITEM_ERROR", payload: response });
    });
};
