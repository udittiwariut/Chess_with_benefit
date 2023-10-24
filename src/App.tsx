import MainGameScreen from "./component/view/mainGameScreen/MainGameScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGameScreen from "./component/view/StartGameScreen/StartGameScreen";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import MobileScreen from "./component/view/mobile_view/MobileViewPAge";

function App() {
	const { height, width } = useWindowDimensions();
	if (width < 800) return <MobileScreen />;

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
