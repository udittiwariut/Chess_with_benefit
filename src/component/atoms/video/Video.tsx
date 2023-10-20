import ReactPlayer from "react-player";
import UserDisplay from "../userDisplay/UserDisplay";

const Video = ({ stream, muted }: { stream: MediaStream; muted: boolean }) => {
	if (!stream) return <UserDisplay />;

	console.log(stream);

	return (
		<ReactPlayer
			playsinline
			url={stream}
			playing={true}
			muted={muted}
			style={{
				transform: "rotateY(180deg)",
				backgroundColor: "#FAF9F6",
				borderRadius: "5%",
			}}
			height={"39%"}
		></ReactPlayer>
	);
};

export default Video;
