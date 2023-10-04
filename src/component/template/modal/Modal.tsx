import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import useOutSideToClose from "./../../../utils/hooks/useOutSideToClose";

interface props {
	children: React.ReactNode;
	closeModal: Dispatch<SetStateAction<boolean>>;
	title: string;
}

const Modal = ({ children, closeModal }: props) => {
	const ref = useRef<Element | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(false);

	useOutSideToClose(modalRef, closeModal);

	useEffect(() => {
		ref.current = document.getElementById("portal");
		setMounted(true);
	}, []);

	return (
		mounted &&
		ref.current &&
		createPortal(
			<div className="block fixed w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)] z-[1000] pt-[100px] left-0 top-0">
				<div
					ref={modalRef}
					className="absolute -translate-x-2/4 -translate-y-2/4 z-[1000] rounded-xl bg-white  left-2/4 top-2/4  overflow-y-auto"
				>
					{children}
				</div>
			</div>,

			ref.current
		)
	);
};

export default Modal;
