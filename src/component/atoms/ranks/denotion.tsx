import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { v4 as uuid } from "uuid";

const denotionVariant = cva(null, {
	variants: {
		variant: {
			vertical: "h-tileHeight w-5 flex items-center justify-center",
			horizontal: "w-tileWidth text-center grow",
		},
	},
});
interface props
	extends ComponentProps<"div">,
		VariantProps<typeof denotionVariant> {
	denotionArray: string[];
}

const Denotion = ({ denotionArray, variant, ...props }: props) => {
	return (
		<div
			className={`flex ${
				variant === "vertical" ? "flex-col " : "flex-row w-[calc(8*6rem)]"
			}`}
		>
			{denotionArray.map((ele) => (
				<div key={uuid()} {...props} className={denotionVariant({ variant })}>
					{ele}
				</div>
			))}
		</div>
	);
};

export default Denotion;
