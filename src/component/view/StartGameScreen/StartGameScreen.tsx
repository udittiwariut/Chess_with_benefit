import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import socket from "../../../utils/socket/socket";

import Input from "../../atoms/Input/input";
import Button from "../../atoms/button/Button";
import { v4 as uuid } from "uuid";
import Card from "../../atoms/card/Card";
import { useAppDispatch } from "../../../store/typedHooks";
import store from "../../../store/store";

const StartGameScreen = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [{ val, isOnChangeValid }, setText] = useState({
		val: "",
		isOnChangeValid: true,
	});
	let [searchParams, setSearchParams] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText((prev) => {
			return { ...prev, val: e.target.value };
		});
	};

	const handleClick = () => {
		const roomId = uuid();
		const url = window.location.origin + "/" + roomId;
		setSearchParams(val);

		socket.emit("create-session", roomId, {
			w: val,
			state: store.getState().chess,
		});
		setText({ isOnChangeValid: false, val: url });
	};

	const handleCopy = () => {
		const url = val.split("/");
		const roomId = url[url.length - 1];
		navigate(`/${roomId}?user=${searchParams}&player=w`);
	};

	return (
		<div className="flex justify-center items-center w-full h-[100dvh]">
			<Card className="p-4">
				<Input
					placeholder="Enter your Name"
					value={val}
					onChange={(e) => isOnChangeValid && handleChange(e)}
				/>
				<Button
					className="border border-darkTile text-darkTile hover:bg-darkTile mt-3 "
					disabled={val.length >= 4 ? false : true}
					onClick={isOnChangeValid ? handleClick : handleCopy}
				>
					{isOnChangeValid ? "Generate Link" : "Start Game"}
				</Button>
			</Card>
		</div>
	);
};

export default StartGameScreen;
