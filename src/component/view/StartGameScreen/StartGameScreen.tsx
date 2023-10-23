import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tost } from "../../../store/tost/tostSlice";
import Input from "../../atoms/Input/input";
import Button from "../../atoms/button/Button";
import { v4 as uuid } from "uuid";
import Card from "../../atoms/card/Card";
import { useAppDispatch } from "../../../store/typedHooks";
import store from "../../../store/store";
import apiCall, { Urls } from "../../../utils/apiCalls/apiCall";
import Loader from "../../atoms/loader/Loader";

const StartGameScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
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

	const handleClick = async () => {
		const roomId = uuid();
		const url = window.location.origin + "/" + roomId;
		setSearchParams(val);
		const body = {
			initialState: store.getState().chess,
			roomId,
			playerInfo: { w: val },
		};
		setIsLoading(true);
		const res = await apiCall.post(Urls.CREATE_SESSION, body);
		setIsLoading(false);
		if (res.status) setText({ isOnChangeValid: false, val: url });
		if (res.error) dispatch(tost({ isOpen: true, message: res.error }));
	};

	const handleCopy = () => {
		const url = val.split("/");
		const roomId = url[url.length - 1];
		navigate(`/${roomId}?user=${searchParams}&player=w`);
	};
	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex justify-center items-center w-full h-[100dvh]">
			<Card className="p-4">
				<Input
					placeholder="Enter your Name"
					value={val}
					onChange={(e) => isOnChangeValid && handleChange(e)}
				/>
				<Button
					className="border border-darkTile text-darkTile hover:bg-darkTile mt-3"
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
