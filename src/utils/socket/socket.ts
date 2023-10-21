import { io } from "socket.io-client";
import apiCall from "../apiCalls/apiCall";

console.log(apiCall.baseUrl);

const socket = io(apiCall.baseUrl);

socket.connect();

export default socket;
