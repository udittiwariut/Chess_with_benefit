import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "../../../utils/functions/classHelperFn";

const cardVariant = cva(
	"block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]",
	{
		variants: {
			type: {
				tost: "shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]",
				box: "shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]",
			},
		},
	}
);

interface props
	extends ComponentProps<"div">,
		VariantProps<typeof cardVariant> {}

const Card = ({ className, ...props }: props) => {
	return (
		<div className={cn(cardVariant({ className }))} {...props}>
			{props.children}
		</div>
	);
};

export default Card;
