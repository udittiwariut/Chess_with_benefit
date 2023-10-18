import { useState } from "react";
import socket from "../../../utils/socket/socket";
import Input from "../../atoms/Input/input";
import Button from "../../atoms/button/Button";
import Card from "../../atoms/card/Card";
import {
	useNavigate,
	useSearchParams,
	useParams,
	SetURLSearchParams,
} from "react-router-dom";

const JoinGameScreen = ({
	setSearchParams,
}: {
	setSearchParams: SetURLSearchParams;
}) => {
	const param = useParams();
	const [val, setText] = useState("");

	const handleClick = () => {
		const roomId = param.roomId;
		socket.emit("join-session", roomId, { b: val });

		setSearchParams({ user: val, player: "b" });
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
				>
					join Game
				</Button>
			</Card>
		</div>
	);
};

export default JoinGameScreen;
