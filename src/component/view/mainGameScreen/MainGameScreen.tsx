import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/typedHooks";
import Confetti from "react-confetti";
import Chess from "../../template/Chess/Chess";
import VideoConference from "../../template/videoConference/VideoConference";
import { useAppSelector } from "../../../store/typedHooks";
import { UserObj, user as userReducer } from "../../../store/user/userSlice";
import JoinGameScreen from "../joinGameScreen/JoinGameScreen";
import { setBingingState } from "../../../store/chessBoardSlice/chessBoreSlice";
import socket from "../../../utils/socket/socket";
import { opponent } from "../../../store/user/userSlice";
import apiCall from "../../../utils/apiCalls/apiCall";
import Loader from "../../atoms/loader/Loader";
import Waiting from "../../atoms/wating/Wating";

function MainGameScreen() {
	const dispatch = useAppDispatch();
	const param = useParams();

	const [searchParams, setSearchParams] = useSearchParams();
	const [sessionState, setSessionState] = useState({
		isLoading: false,
		isPlayerPresent: true,
		redirect: false,
		loaded: false,
		bothPlayerJoined: false,
	});

	const { isCheckMate, winner } = useAppSelector(
		(state) => state.chess.checkMate
	);

	useEffect(() => {
		socket.on("both-player-joined", (userInRoom: UserObj[]) => {
			const opponentArray = userInRoom.filter(
				(user) => user.piece != searchParams.get("player")
			);
			if (opponentArray[0]) {
				dispatch(opponent(opponentArray[0]));
				setSessionState({ ...sessionState, bothPlayerJoined: true });
			}
		});
	}, []);

	useEffect(() => {
		const sessionChecker = async () => {
			setSessionState({ ...sessionState, isLoading: true });

			const url = `${param.roomId}?player=${searchParams.get("player")}`;
			const data = await apiCall.get(url);

			if (data.redirect) {
				setSessionState({ ...sessionState, redirect: true, isLoading: false });
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
			setSessionState({ ...sessionState, isLoading: false });
		};
		sessionChecker();
	}, [param, searchParams.get("user"), searchParams.get("player")]);

	if (sessionState.isLoading) {
		return <Loader />;
	}

	if (sessionState.redirect) {
		return <JoinGameScreen setSearchParams={setSearchParams} />;
	}

	if (!sessionState.isLoading && !sessionState.bothPlayerJoined) {
		return <Waiting />;
	}

	return (
		<div className="h-screen w-screen">
			{isCheckMate && (
				<Confetti width={window.innerWidth} height={window.innerHeight} />
			)}
			<div className="flex h-full p-2 ">
				<Chess winner={winner} isCheckMate={isCheckMate} />
				<VideoConference />
			</div>
		</div>
	);
}

export default MainGameScreen;
