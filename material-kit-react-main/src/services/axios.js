import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function retrieveUsers() {
  return await axiosClient.get("/users");
}
export async function retrieveUserId(user_id) {
  return await axiosClient.get(`/users/${user_id}`);
}
export async function retrieveItems() {
  return await axiosClient.get("/items");
}
export async function retrieveItemId(item_id) {
  return await axiosClient.get(`/item/${item_id}`);
}
export async function registerUser(user) {
  return await axiosClient.post("/user", user);
}
export async function addItem(user_id,item) {
  return await axiosClient.post(`/users/${user_id}/items`, item);
}
export async function deleteItem(item_id) {
  return await axiosClient.delete(`/item/${item_id}`);
}
export async function editUser(user) {
  return await axiosClient.put(`/users/${user.id}`, user);
}
export async function loginUser(user) {
  return await axiosClient.post("/token", user);
}
