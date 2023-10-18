import { io } from "socket.io-client";
import apiCall from "../apiCalls/apiCall";

const socket = io(apiCall.baseUrl);

export default socket;
