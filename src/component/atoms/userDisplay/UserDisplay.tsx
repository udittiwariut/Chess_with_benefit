import Icon from "../icon/Icon.";

const UserDisplay = () => {
	return (
		<div className="h-[39%] w-[100%] bg-[#FAF9F6]">
			<div className="w-50% h-[100%] flex items-center justify-center">
				<Icon
					type="USER"
					stroke="#D3D3D3"
					strokeWidth=".4"
					className="h-[90%]"
				/>
			</div>
		</div>
	);
};

export default UserDisplay;
