import React, { useEffect, MouseEvent } from "react";

const useOutSideToClose = (menuRef: any, setActive: any) => {
	useEffect(() => {
		const clickHandler = (e: any): any => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setActive(false);
			}
		};
		document.addEventListener("mousedown", clickHandler);

		return () => {
			document.removeEventListener("mousedown", clickHandler);
		};
	}, [menuRef]);
};
export default useOutSideToClose;
