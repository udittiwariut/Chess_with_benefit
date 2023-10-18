import MainGameScreen from "./component/view/mainGameScreen/MainGameScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGameScreen from "./component/view/StartGameScreen/StartGameScreen";

import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<StartGameScreen />} />
				<Route path="/:roomId" element={<MainGameScreen />} />
			</Routes>
		</Router>
	);
}

export default App;
