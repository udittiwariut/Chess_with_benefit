import { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import {
	tost,
	tost as tostAction,
	tostPermission,
} from "../../../store/tost/tostSlice";
import Video from "../../atoms/video/Video";
import socket from "../../../utils/socket/socket";
import peer from "../../../services/peer";
import { UserObj, setDisConnectTimeOutId } from "../../../store/user/userSlice";
import VideoCallControls from "../../molecule/videoCallContols/VideoCallControls";
import NameTag from "../../molecule/nameTag/NameTag";
import { isBothPlayerConnected } from "../../../store/user/userSlice";

const VideoConference = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const opponent = useAppSelector((state) => state.user.opponent);
	const permission = useAppSelector((state) => state.tost.isPermissionGranted);
	const remoteStreamRef = useRef<MediaStream>();
	const localStreamRef = useRef<MediaStream>();
	const isCallAccepted = useRef<boolean>(false);
	const [localStream, setLocalStream] = useState<MediaStream>();
	const [remoteStream, setRemoteStream] = useState<MediaStream>();
	const [isMute, setIsMute] = useState<boolean>(false);

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

	const makeOffer = async (opponentId: string) => {
		const offer = await peer.getOffer();
		socket.emit("send-offer-from-client", opponentId, offer);
	};

	const sendAnsFromServerHandler = async (
		_: string,
		ans: RTCSessionDescriptionInit
	) => {
		await peer.setRemoteDescription(ans);
	};

	const cutCallFromRemoteHandler = () => {
		dispatch(tostPermission(false));
		setRemoteStream(undefined);
		dispatch(
			tostAction({
				isOpen: true,
				message: `${opponent.userName} ended video stream`,
			})
		);
		isCallAccepted.current = false;
	};

	const handleUserDisconnected = (user: UserObj) => {
		dispatch(
			tost({
				isOpen: true,
				message: `${user.userName} is disconnected this session will expire in 5min if not reconnected `,
			})
		);
		setRemoteStream(undefined);
		isCallAccepted.current = false;
		dispatch(tostPermission(false));
		dispatch(isBothPlayerConnected(false));
		// refresh after session expire
		//clear time is located in Main game screen
		let sessionTimer = setTimeout(() => {
			window.location.reload();
		}, 1000 * 60 * 5 + 400);
		dispatch(setDisConnectTimeOutId(sessionTimer));
	};

	const handleCallAcceptedRemote = () => {
		dispatch(
			tost({ isOpen: true, message: `${opponent.userName} accepted your call` })
		);

		isCallAccepted.current = true;
	};

	const negotiationDoneFromServerHandler = async (
		_: string,
		ans: RTCSessionDescription
	) => {
		await peer.setRemoteDescription(ans);
	};

	useEffect(() => {
		socket.on("make-offer", makeOffer);
		socket.on("send-offer-from-server", sendOfferFromServerHandler);
		socket.on("send-ans-from-server", sendAnsFromServerHandler);
		socket.on("negotiation-req-from-server", negotiationReqFormServerHandler);
		socket.on("negotiation-done-from-server", negotiationDoneFromServerHandler);
		socket.on("cut-call-remote", cutCallFromRemoteHandler);
		socket.on("user-disconnected", handleUserDisconnected);
		socket.on("call-accepted-remote", handleCallAcceptedRemote);
	}, []);

	useEffect(() => {
		if (!localStream && !isCallAccepted.current) return;
		(async () => {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			stream.getTracks().forEach((track) => {
				peer.peer?.addTrack(track, stream);
			});
			localStreamRef.current = stream;
		})();
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
				dispatch(
					tostAction({
						isOpen: true,
						message: `${opponent.userName} wants to video chat`,
						isTostActionNeeded: true,
					})
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

	const shareVideo = async () => {
		if (!localStream) {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			stream.getTracks().forEach((track) => {
				peer.peer?.addTrack(track, stream);
			});
			setLocalStream(stream);
		}
	};

	const handleCutCall = async () => {
		localStream?.getTracks().forEach((track) => {
			track.stop();
		});
		localStreamRef.current?.getTracks().forEach((track) => {
			track.stop();
		});
		setLocalStream(undefined);
		socket.emit("call-cut", opponent.socketId);
	};

	const handleAudio = (isMiceOn: boolean) => {
		if (localStream && localStreamRef.current) {
			localStream.getAudioTracks()[0].enabled = isMiceOn;
			localStreamRef.current.getAudioTracks()[0].enabled = isMiceOn;
		}
		if (isMiceOn) setIsMute(false);
		else setIsMute(true);
	};

	return (
		<div className="video-container p-2 flex-1">
			<NameTag player={opponent.piece}>{opponent.userName}</NameTag>
			<Video stream={remoteStream!} muted={false} />
			<NameTag player={user.piece}>{user.userName}</NameTag>
			<Video stream={localStream!} muted={true} />
			<VideoCallControls
				localStream={localStream}
				isMute={isMute}
				shareVideo={shareVideo}
				handleCutCall={handleCutCall}
				handleAudio={handleAudio}
			/>
		</div>
	);
};

export default VideoConference;
