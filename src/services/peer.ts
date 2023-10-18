class PeerService {
	peer: RTCPeerConnection | undefined;
	remoteStream: MediaStream | undefined;
	constructor() {
		this.peer = new RTCPeerConnection({
			iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
		});
		this.remoteStream = new MediaStream();
	}

	async getAnswer(offer: RTCSessionDescriptionInit) {
		try {
			if (this.peer) {
				await this.peer.setRemoteDescription(offer);
				const ans = await this.peer.createAnswer();
				await this.peer.setLocalDescription(new RTCSessionDescription(ans));
				return ans;
			}
		} catch (error: any) {
			return;
		}
	}

	async setRemoteDescription(ans: RTCSessionDescriptionInit) {
		if (this.peer) {
			await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
		}
	}

	async getOffer() {
		if (this.peer) {
			const offer = await this.peer.createOffer();
			await this.peer.setLocalDescription(new RTCSessionDescription(offer));
			return offer;
		}
	}
}

export default new PeerService();
