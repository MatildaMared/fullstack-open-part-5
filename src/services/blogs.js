import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const create = async (newBlog) => {
	try {
		const config = {
			headers: { Authorization: token },
		};

		const response = await axios.post(baseUrl, newBlog, config);
		return response.data;
	} catch (exception) {
		return exception.response.data;
	}
};

const update = async (id, updatedBlog) => {
	try {
		const config = {
			headers: { Authorization: token },
		};

		const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
		return response.data;
	} catch (exception) {
		return exception.response.data;
	}
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export default { getAll, setToken, create, update };
