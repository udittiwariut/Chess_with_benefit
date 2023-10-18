import { ComponentProps } from "react";

export interface props extends ComponentProps<"svg"> {
	type?: "CLOSE";
}

const Close = ({ ...props }: props) => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox={`0 0 ${props.height} ${props.width}`}
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	);
};

const IconMap = {
	CLOSE: Close,
};

function Icon({ type, ...props }: props) {
	const Icon = IconMap[type!];
	return <Icon {...props} />;
}

export default Icon;
