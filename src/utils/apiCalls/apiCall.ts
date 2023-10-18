import axios from "axios";

const baseUrlOfServer = "http://localhost:3001";

class ApiCall {
	constructor(public baseUrl: string = baseUrlOfServer) {
		this.baseUrl = baseUrl;
	}

	async get(to: string) {
		const res = await axios.get(`${this.baseUrl}/${to}`);
		return res.data;
	}
}

export default new ApiCall();
