import Title from "../../atoms/Title/Title";
const SessionExpired = () => {
	return (
		<div className="block fixed w-screen h-screen overflow-auto bg-white z-[1000] pt-[100px] left-0 top-0 ">
			<div className="absolute -translate-x-2/4 -translate-y-2/4 z-[1000] rounded-xl bg-white  left-2/4 top-2/4  overflow-y-auto">
				<div className="bg-lightTile flex flex-col px-6 py-9 items-center justify-stretch relative">
					<div className="flex">
						<Title size={"lg"} className="text-center">
							Session has Expired !!
						</Title>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SessionExpired;
