import { retrieveUsers, retrieveUserId, registerUser } from "../services/axios";

export const GetAllUsers = (router) => async (dispatch) => {
  dispatch({ type: "GETALL_REQUEST" });
  return await retrieveUsers(router)
    .then(function (response) {
      dispatch({ type: "GETALL_SUCCESS", payload: response });
    })
    .catch(function (response) {
      dispatch({ type: "GETALL_ERROR", payload: response });
    });
};

export const GetUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GETBYID_REQUEST" });
    retrieveUserId(id)
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

export const RegisterUser = (data) => async (dispatch) => {
  dispatch({ type: "ADD_START" });
  return await registerUser(data)
    .then(function (response, request, error) {
      if (response) {
        dispatch({ type: "ADD_SUCCESS", payload: response });
      } else {
        dispatch({ type: "ADD_FAILD", payload: response });
      }
    })
    .catch(function (response, error) {
      dispatch({ type: "ADD_FAILD", payload: response });
    });
};
