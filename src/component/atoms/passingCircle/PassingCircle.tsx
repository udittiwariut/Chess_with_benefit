const PassingCircle = ({ rank, file }: { rank: number; file: number }) => {
	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);
	return (
		<div
			className={`h-tileHeight z-10 absolute w-tileWidth`}
			style={{
				top: `${tileSize * rank}rem`,
				left: `${tileSize * file}rem`,
			}}
		>
			<div className="h-[50%] w-[50%] bg-[rgba(0,0,0,0.1)] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute"></div>
		</div>
	);
};

export default PassingCircle;
