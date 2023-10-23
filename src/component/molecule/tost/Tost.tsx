import { useCallback, useEffect } from "react";
import Card from "../../atoms/card/Card";
import {
	tost as tostAction,
	tostPermission,
} from "../../../store/tost/tostSlice";
import Button from "../../atoms/button/Button";
import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import socket from "../../../utils/socket/socket";
let timer: NodeJS.Timeout;

const DEFAULT_TOST_AUTO_CLOSE = 6000;
const DEFAULT_AFTER_CLICK_CLOSE = 200;

const Tost = () => {
	const dispatch = useAppDispatch();
	const opponentSocketId = useAppSelector(
		(state) => state.user.opponent.socketId
	);

	const { isOpen, message, isTostActionNeeded } = useAppSelector(
		(state) => state.tost
	);

	const handleClose = useCallback(() => {
		dispatch(tostAction({ isOpen: false, message: "" }));
	}, []);

	useEffect(() => {
		if (isOpen) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				dispatch(tostAction({ isOpen: false, message: "" }));
			}, DEFAULT_TOST_AUTO_CLOSE);
		}
	}, [isOpen, message]);

	const clickHandler = async () => {
		dispatch(tostPermission(true));
		socket.emit("call-accepted", opponentSocketId);
		setTimeout(() => {
			dispatch(tostAction({ isOpen: false, message: "" }));
		}, DEFAULT_AFTER_CLICK_CLOSE);
	};

	return (
		<Card
			className={`p-4 max-w-[30%] absolute top-10 right-[-30%] ${
				isOpen && "right-2"
			} border border-lightTile transition-all duration-150 ease-linear`}
			type={"tost"}
		>
			<div className="flex items-center">
				<div className="text-base flex items-center font-semibold">
					{message}
				</div>
				<Button
					onClick={handleClose}
					className="hover:text-black p-0 ml-7"
					icon={"iconRight"}
					iconProps={{ type: "CLOSE", className: "h-5 w-5" }}
				></Button>
			</div>
			{isTostActionNeeded && (
				<Button
					onClick={clickHandler}
					className="border text-sm pt-1 pb-1 border-darkTile text-darkTile hover:bg-darkTile mt-3  "
				>
					Allow
				</Button>
			)}
		</Card>
	);
};

export default Tost;
