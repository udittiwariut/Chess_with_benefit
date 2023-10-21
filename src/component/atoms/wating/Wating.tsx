import Lottie from "lottie-react";
import Wating_Animation from "./../../../icons/lotti-wating-animation.json";

const Waiting = () => {
	return (
		<div className="block fixed w-full h-full">
			<div className="w-[26rem] h-[26rem] absolute -translate-x-2/4 -translate-y-2/4 z-[1000] rounded-xl bg-white  left-2/4 top-2/4  overflow-y-hidden">
				<div className="w-96 h-96">
					<Lottie animationData={Wating_Animation} loop></Lottie>
				</div>
				<p className="text-slate-500 mt-0 text-center text-base">
					Waiting for other player to Join the game...
				</p>
			</div>
		</div>
	);
};

export default Waiting;
