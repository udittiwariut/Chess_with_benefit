import Denotion from "../../atoms/ranks/denotion";
import { useAppSelector } from "../../../store/typedHooks";
import ChessBoard from "../../molecule/chessBord/ChesssBoard";
import ChessLogic from "../../molecule/chessLogic/ChessLogic";
import GameOverScreen from "../../organisms/GameOverScreen";
import Modal from "../modal/Modal";
import { useState } from "react";

function Chess({
	winner,
	isCheckMate,
}: {
	winner: string;
	isCheckMate: boolean;
}) {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const player = useAppSelector((state) => state.user.user);

	const files = Array(8)
		.fill(0)
		.map((_, i) => (8 - i).toString());

	const ranks = Array(8)
		.fill(0)
		.map((_, i) => String.fromCharCode(i + 97));

	return (
		<div id="chess_game">
			{player.roomId && (
				<div>
					<div className="flex">
						<Denotion variant="vertical" denotionArray={files} />
						<div>
							<div id="chessBoard" className="relative">
								<ChessBoard ranks={ranks} files={files} />
								<ChessLogic player={player} />
							</div>
							<Denotion variant="horizontal" denotionArray={ranks} />
						</div>
					</div>
				</div>
			)}

			{isCheckMate && isModalOpen && (
				<Modal title="Game Over" closeModal={setIsModalOpen}>
					<GameOverScreen winner={winner} />
				</Modal>
			)}
		</div>
	);
}

export default Chess;
