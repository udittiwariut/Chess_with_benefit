import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/typedHooks";
import Confetti from "react-confetti";
import Chess from "../../template/Chess/Chess";
import VideoConference from "../../template/videoConference/VideoConference";
import { useAppSelector } from "../../../store/typedHooks";
import { UserObj, user as userReducer } from "../../../store/user/userSlice";
import JoinGameScreen from "../joinGameScreen/JoinGameScreen";
import axios from "axios";
import { SessionObj } from "../../../store/chessBoardSlice/chessBoreSlice";
import { setBingingState } from "../../../store/chessBoardSlice/chessBoreSlice";
import socket from "../../../utils/socket/socket";
import { opponent } from "../../../store/user/userSlice";

function MainGameScreen() {
	const dispatch = useAppDispatch();
	const param = useParams();

	const [searchParams, setSearchParams] = useSearchParams();
	const [sessionState, setSessionState] = useState({
		isLoading: false,
		isPlayerPresent: true,
		redirect: false,
	});

	const { isCheckMate, winner } = useAppSelector(
		(state) => state.chess.checkMate
	);

	useEffect(() => {
		socket.on("both-player-joined", (userInRoom: UserObj[]) => {
			const opponentArray = userInRoom.filter(
				(user) => user.piece != searchParams.get("player")
			);
			if (opponentArray[0]) dispatch(opponent(opponentArray[0]));
		});
	}, []);

	useEffect(() => {
		const sessionChecker = async () => {
			const url = `${import.meta.env.VITE_BASE_URL}/${
				param.roomId
			}?player=${searchParams.get("player")}`;

			const res = await axios.get(url);

			const data: SessionObj = res.data;

			if (data.redirect) {
				setSessionState({ ...sessionState, redirect: true });
				return;
			} else {
				setSessionState({ ...sessionState, redirect: false });
			}

			socket.emit(
				"join-room",
				param.roomId,
				searchParams.get("user"),
				searchParams.get("player")
			);

			dispatch(
				userReducer({
					roomId: param.roomId,
					userName: searchParams.get("user")!,
					piece: searchParams.get("player")!,
				})
			);

			dispatch(setBingingState(data.state!));
		};
		sessionChecker();
	}, [param, searchParams.get("user"), searchParams.get("player")]);

	if (sessionState.redirect) {
		return <JoinGameScreen setSearchParams={setSearchParams} />;
	}

	return (
		<>
			{isCheckMate && (
				<Confetti width={window.innerWidth} height={window.innerHeight} />
			)}
			<div className="flex">
				<Chess winner={winner} isCheckMate={isCheckMate} />
				<VideoConference />
			</div>
		</>
	);
}

export default MainGameScreen;
