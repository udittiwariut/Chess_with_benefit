import React, { ComponentProps, useCallback, useEffect } from "react";
import Card from "../../atoms/card/Card";
import {
	tost as tostAction,
	tostPermission,
} from "../../../store/tost/tostSlice";
import Button from "../../atoms/button/Button";
import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import peer from "../../../services/peer";

// const TostVariant = cva("p-2.5 absolute top-0 right-0 border border-lightTile");

const DEFAULT_TOST_AUTO_CLOSE = 10000;

const Tost = ({ allowTost }: { allowTost: boolean }) => {
	const dispatch = useAppDispatch();
	const { isOpen, message } = useAppSelector((state) => state.tost);

	const handleClose = useCallback(() => {
		dispatch(tostAction({ isOpen: false, message: "" }));
	}, []);

	useEffect(() => {
		if (isOpen && allowTost) {
			setTimeout(() => {
				console.log("is Working");

				dispatch(tostAction({ isOpen: false, message: "" }));
			}, DEFAULT_TOST_AUTO_CLOSE);
		}
	}, [isOpen]);

	const clickHandler = async () => {
		dispatch(tostPermission(true));
		setTimeout(() => {
			dispatch(tostAction({ isOpen: false, message: "" }));
		}, 200);
	};

	return (
		<Card
			className={`p-4 max-w-[30%] absolute top-10 right-[-30%] ${
				isOpen && "right-2"
			} border border-lightTile transition-all duration-150 ease-linear`}
			type={"tost"}
		>
			<div className="flex items-center">
				<div className="text-base flex items-center">{message}</div>
				<Button
					onClick={handleClose}
					className="hover:text-black p-0 ml-7"
					icon={"iconRight"}
					iconProps={{ type: "CLOSE", className: "h-5 w-5" }}
				></Button>
			</div>
			<Button
				onClick={clickHandler}
				className="border text-sm pt-1 pb-1 border-darkTile text-darkTile hover:bg-darkTile mt-3  "
			>
				Allow
			</Button>
			<Button className="border text-sm pt-1 pb-1 border-darkTile text-darkTile hover:bg-darkTile mt-3  ">
				Don't Allow
			</Button>
		</Card>
	);
};

export default Tost;
