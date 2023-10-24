import Button from "../../atoms/button/Button";

interface props {
	localStream: MediaStream | undefined;
	isMute: boolean;
	shareVideo: () => Promise<void>;
	handleCutCall: () => Promise<void>;
	handleAudio: (isMiceOn: boolean) => void;
}

const VideoCallControls = ({
	localStream,
	isMute,
	shareVideo,
	handleCutCall,
	handleAudio,
}: props) => {
	return (
		<div className="flex justify-center gap-6 pt-3 pb-1">
			<Button
				icon={"iconLeft"}
				iconProps={{ type: "VIDEO_CAMERA", className: "w-7 h-7" }}
				className="rounded-md bg-slate-200 gap-3 hover:text-black hover:scale-105 transition-all"
				onClick={shareVideo}
			>
				Connect Video
			</Button>
			{localStream && (
				<Button
					icon={"iconLeft"}
					iconProps={{ type: "PHONE", className: "w-7 h-7" }}
					className="flex items-center bg-[#ff3b30] rounded-[50%] h text-white py-2 px-2 hover:scale-105 transition-all"
					onClick={handleCutCall}
				></Button>
			)}

			{localStream && !isMute && (
				<Button
					icon={"iconLeft"}
					onClick={() => handleAudio(false)}
					iconProps={{ type: "SPEAKER", className: "w-7 h-7" }}
					className="flex items-center bg-slate-200  rounded-[50%] h py-2 px-2 hover:scale-105 hover:text-black transition-all"
				></Button>
			)}
			{localStream && isMute && (
				<Button
					icon={"iconLeft"}
					onClick={() => handleAudio(true)}
					iconProps={{ type: "SPEAKER_MUTE", className: "w-7 h-7" }}
					className="flex items-center bg-slate-200  rounded-[50%] h py-2 px-2 hover:scale-105 hover:text-black transition-all"
				></Button>
			)}
		</div>
	);
};

export default VideoCallControls;
