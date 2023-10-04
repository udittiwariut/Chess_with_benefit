import Chess from "./component/template/Chess/Chess";
import "./App.css";
import Confetti from "react-confetti";
import { useAppSelector } from "./store/typedHooks";

function App() {
	const { isCheckMate, winner } = useAppSelector(
		(state) => state.chess.checkMate
	);

	return (
		<>
			{isCheckMate && (
				<Confetti width={window.innerWidth} height={window.innerHeight} />
			)}

			<Chess winner={winner} isCheckMate={isCheckMate} />
		</>
	);
}

export default App;
