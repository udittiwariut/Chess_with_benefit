import { ComponentProps } from "react";

export interface props extends ComponentProps<"svg"> {
	id: "CLOSE";
}

function Icon({ id, ...props }: props) {
	console.log(id);

	return (
		<svg {...props}>
			<use href={`#${id}`} />
		</svg>
	);
}

export default Icon;
