const AttackCircle = ({ rank, file }: { rank: number; file: number }) => {
	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);
	return (
		<div
			className={`h-tileHeight z-10 absolute w-tileWidth rounded-full border-[6px] border-rose-500 `}
			style={{
				top: `${tileSize * rank}rem`,
				left: `${tileSize * file}rem`,
			}}
		></div>
	);
};

export default AttackCircle;
