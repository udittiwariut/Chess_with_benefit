import { ComponentProps } from "react";
import cn from "../../../utils/functions/classHelperFn";

interface props extends ComponentProps<"label"> {}

const Lebal = ({ className, ...props }: props) => {
	return (
		<label
			className={cn("block text-gray-700 text-sm font-bold mb-2", className)}
			{...props}
		>
			{props.children}
		</label>
	);
};

export default Lebal;
