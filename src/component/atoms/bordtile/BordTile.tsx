import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "../../../utils/functions/classHelperFn";

const buttonVariant = cva("h-tileHeight w-tileWidth inline-block", {
	variants: {
		variant: {
			dark: "bg-darkTile",
			light: "bg-lightTile",
		},
	},
});

interface props
	extends ComponentProps<"div">,
		VariantProps<typeof buttonVariant> {}

const BoardTile = ({ className, variant, ...props }: props) => {
	return (
		<div className={cn(buttonVariant({ variant, className }))} {...props}>
			{props.children}
		</div>
	);
};

export default BoardTile;
