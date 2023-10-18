import { useRef, useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import ReactPlayer from "react-player";
import { tost as tostAction } from "../../../store/tost/tostSlice";
import Button from "../../atoms/button/Button";
import socket from "../../../utils/socket/socket";
import peer from "../../../services/peer";
import Tost from "../../molecule/tost/Tost";

const sendOfferFromServerHandler = async (
	from: string,
	offer: RTCSessionDescriptionInit
) => {
	const ans = await peer.getAnswer(offer);
	if (ans) {
		socket.emit("send-ans-from-client", from, ans);
	} else {
		return;
	}
};

const negotiationReqFormServerHandler = async (
	from: string,
	offer: RTCSessionDescription
) => {
	const ans = await peer.getAnswer(offer);
	if (ans) {
		socket.emit("negotiation-done-from-client", from, ans);
	}
};

const VideoConference = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const opponent = useAppSelector((state) => state.user.opponent);
	const permission = useAppSelector((state) => state.tost.isPermissionGranted);
	const remoteStreamRef = useRef<any>({ current: null });
	const [localStream, setLocalStream] = useState<MediaStream>();
	const [remoteStream, setRemoteStream] = useState<MediaStream>();
	const [allowTost, setAllowTost] = useState<boolean>(true);

	const makeOffer = async (opponentId: string) => {
		const offer = await peer.getOffer();
		socket.emit("send-offer-from-client", opponentId, offer);
	};

	const sendAnsFromServerHandler = async (
		from: string,
		ans: RTCSessionDescriptionInit
	) => {
		await peer.setRemoteDescription(ans);
	};

	useEffect(() => {
		socket.on("make-offer", makeOffer);
		socket.on("send-offer-from-server", sendOfferFromServerHandler);
		socket.on("send-ans-from-server", sendAnsFromServerHandler);
		socket.on("negotiation-req-from-server", negotiationReqFormServerHandler);
		socket.on("negotiation-done-from-server", negotiationDoneFromServerHandler);
	}, []);

	const shareVideo = useCallback(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		stream.getTracks().forEach((track) => {
			peer.peer?.addTrack(track, stream);
		});

		setLocalStream(stream);
		setAllowTost(false);
	}, []);

	const negotiationDoneFromServerHandler = async (
		from: string,
		ans: RTCSessionDescription
	) => {
		await peer.setRemoteDescription(ans);
	};

	useEffect(() => {
		if (localStream) {
			navigator.mediaDevices
				.getUserMedia({
					video: true,
					audio: true,
				})
				.then((stream) => {
					stream.getTracks().forEach((track) => {
						peer.peer?.addTrack(track, stream);
					});
				});
		}
	}, [localStream]);

	useEffect(() => {
		if (opponent.socketId) {
			peer.peer?.addEventListener("negotiationneeded", async () => {
				const offer = await peer.getOffer();
				socket.emit("negotiation-req-from-client", opponent.socketId, offer);
			});
		}
	}, [opponent.socketId]);

	useEffect(() => {
		if (peer.peer) {
			peer.peer.ontrack = async ({ streams: [stream] }) => {
				console.log("on track");
				dispatch(
					tostAction({ isOpen: true, message: "Udit wants to video chat" })
				);
				remoteStreamRef.current = stream;
			};
		}
	}, []);

	useEffect(() => {
		if (permission) {
			setRemoteStream(remoteStreamRef.current);
		}
	}, [permission]);

	return (
		<div className="video-container">
			{remoteStream && (
				<ReactPlayer
					playsinline
					url={remoteStream}
					muted={true}
					playing={true}
					style={{
						width: "300px",
						height: "300px",
						transform: "rotateY(180deg)",
						backgroundColor: "white",
					}}
				></ReactPlayer>
			)}
			<ReactPlayer
				playsinline
				url={localStream}
				muted={true}
				playsInline
				playing={localStream?.active ? true : false}
				style={{
					width: "300px",
					height: "300px",
					transform: "rotateY(180deg)",
					backgroundColor: "white",
				}}
			></ReactPlayer>
			<Button className="bg-red-600">Cut call</Button>
			<Button className="bg-green-600" onClick={shareVideo}>
				start call
			</Button>
			<Tost allowTost={allowTost} />
		</div>
	);
};

export default VideoConference;
