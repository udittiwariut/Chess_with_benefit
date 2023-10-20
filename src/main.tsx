import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Tost from "./component/molecule/tost/Tost.tsx";
import "./index.css";
import { Provider } from "react-redux/es/exports";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
		<Tost />
	</Provider>
);
