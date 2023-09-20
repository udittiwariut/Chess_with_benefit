import Denotion from "./component/atoms/ranks/denotion";
import ChessLogic from "./component/molecule/chessLogic/ChessLogic";
import ChessBoard from "./component/molecule/chessBord/ChesssBoard";
import "./App.css";

function App() {
	const files = Array(8)
		.fill(0)
		.map((_, i) => (8 - i).toString());

	const ranks = Array(8)
		.fill(0)
		.map((_, i) => String.fromCharCode(i + 97));

	return (
		<>
			<div className=" flex">
				<Denotion variant="vertical" denotionArray={files} />
				<div>
					<div id="chessBoard" className="relative">
						<ChessBoard ranks={ranks} files={files} />
						<ChessLogic />
					</div>
					<Denotion variant="horizontal" denotionArray={ranks} />
				</div>
			</div>
		</>
	);
}

export default App;
