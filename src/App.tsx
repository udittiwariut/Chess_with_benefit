import MainGameScreen from "./component/view/mainGameScreen/MainGameScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGameScreen from "./component/view/StartGameScreen/StartGameScreen";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import MobileScreen from "./component/view/mobile_view/MobileViewPAge";
import Page404 from "./component/view/404Page/Page404";

function App() {
	const dimensions = useWindowDimensions();
	if (dimensions.width < 800) return <MobileScreen />;

	return (
		<Router>
			<Routes>
				<Route path="/" element={<StartGameScreen />} />
				<Route path="/:roomId" element={<MainGameScreen />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
		</Router>
	);
}

export default App;
