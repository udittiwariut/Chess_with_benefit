import clsx, { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassArray) => {
	return twMerge(clsx(inputs));
};

export default cn;
