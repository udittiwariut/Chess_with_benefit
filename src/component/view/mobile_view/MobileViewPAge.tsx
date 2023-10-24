import Title from "../../atoms/Title/Title";
import Icon from "../../atoms/icon/Icon.";
const MobileScreen = () => {
	return (
		<div className="w-screen h-screen">
			<div className="flex items-center justify-center">
				<Icon type="MOBILESVG" className="text-darkTile flex-1"></Icon>
				<Title size={"md"} className="text-center flex-1">
					Mobile view under is under Development
				</Title>
			</div>
		</div>
	);
};

export default MobileScreen;
