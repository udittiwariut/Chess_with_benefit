import Confetti from "react-confetti";
import Denotion from "./component/atoms/ranks/denotion";
import ChessLogic from "./component/molecule/chessLogic/ChessLogic";
import ChessBoard from "./component/molecule/chessBord/ChesssBoard";
import { useAppSelector } from "./store/typedHooks";

import "./App.css";

function App() {
	const isCheckMate = useAppSelector((state) => state.chess.isCheckMate);

	console.log(isCheckMate);

	const files = Array(8)
		.fill(0)
		.map((_, i) => (8 - i).toString());

	const ranks = Array(8)
		.fill(0)
		.map((_, i) => String.fromCharCode(i + 97));

	return (
		<>
			{/* <Confetti width={window.innerWidth} height={window.innerHeight} /> */}
			<div className="flex">
				<Denotion variant="vertical" denotionArray={files} />
				<div>
					<div id="chessBoard" className="relative">
						<ChessBoard ranks={ranks} files={files} />
						<ChessLogic />
					</div>
					<Denotion variant="horizontal" denotionArray={ranks} />
				</div>
				{/* <h1 className="text-5xl">Turn: {turn}</h1> */}
			</div>
		</>
	);
}

export default App;
