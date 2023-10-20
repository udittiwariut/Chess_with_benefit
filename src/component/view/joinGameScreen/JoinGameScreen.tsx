import { useState } from "react";
import Input from "../../atoms/Input/input";
import { tost } from "../../../store/tost/tostSlice";
import Button from "../../atoms/button/Button";
import Card from "../../atoms/card/Card";
import { useParams, SetURLSearchParams } from "react-router-dom";
import apiCall, { Urls } from "../../../utils/apiCalls/apiCall";
import { useAppDispatch } from "../../../store/typedHooks";

const JoinGameScreen = ({
	setSearchParams,
}: {
	setSearchParams: SetURLSearchParams;
}) => {
	const dispatch = useAppDispatch();
	const param = useParams();
	const [val, setText] = useState("");

	const handleClick = async () => {
		const roomId = param.roomId;
		const body = { roomId, playerInfo: { b: val } };
		const res = await apiCall.post(Urls.JOIN_SESSION, body);
		if (res.status) setSearchParams({ user: val, player: "b" });
		if (res.error) dispatch(tost({ isOpen: true, message: res.error }));
	};

	return (
		<div className="flex justify-center items-center w-full h-[100dvh]">
			<Card className="p-4">
				<Input
					placeholder="Enter your Name"
					value={val}
					onChange={(e) => setText(e.target.value)}
				/>
				<Button
					className="border border-darkTile text-darkTile hover:bg-darkTile mt-3 "
					onClick={handleClick}
					disabled={val.length >= 4 ? false : true}
				>
					join Game
				</Button>
			</Card>
		</div>
	);
};

export default JoinGameScreen;
