import http from "../utils/http-common";
import authHeader from "./auth-header";

const getAll = async () => {
    try {
        const response = await http.get("/items", {
            headers: authHeader(),
        });
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            return (window.location.href = '/');
        }
        return error;
    }
};
const getAllUsers = async () => {
    try {
        const response = await http.get("/users", {
            headers: authHeader(),
        });
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            return (window.location.href = '/');
        }
        return error;
    }
};

const create = async (id, data) => {
    try {
        const response = await http.post(`/users/${id}/items`, data, {
            headers: authHeader(),
        });
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            return (window.location.href = '/');
        }
        return error;
    }
};

const remove = async (id) => {
    try {
        const response = await http.delete(`/items/${id}`, {
            headers: authHeader(),
        });
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            return (window.location.href = '/');
        }
        return error;
    }
};

const Service = {
    getAll,
    getAllUsers,
    create,
    remove,
};

export default Service;