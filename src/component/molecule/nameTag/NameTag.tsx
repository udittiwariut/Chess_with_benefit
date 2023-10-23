import "./../../../icon.css";
interface props {
	player: string;
	children?: React.ReactNode;
}

const NameTag = ({ player, children }: props) => {
	return (
		<div className="flex gap-3 my-2">
			<span className="text-3xl font-Play font-[700] text-[#404040]">
				{children}
			</span>
			<div
				className={`h-[2.5rem] w-[2.25rem] bg-contain  king-${player}`}
			></div>
		</div>
	);
};

export default NameTag;
