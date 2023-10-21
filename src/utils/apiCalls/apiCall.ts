import axios from "axios";

const baseUrlOfServer = import.meta.env.VITE_BASE_URL;
export const Urls = {
	JOIN_SESSION: "join-session",
	CREATE_SESSION: "create-session",
};

class ApiCall {
	constructor(public baseUrl: string = baseUrlOfServer) {
		this.baseUrl = baseUrl;
	}

	async get(to: string) {
		const res = await axios.get(`${this.baseUrl}/${to}`);
		return res.data;
	}

	async post(to: string, body: any) {
		const res = await axios.post(`${this.baseUrl}/${to}`, body);
		return res.data;
	}
}

export default new ApiCall();
