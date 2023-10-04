import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import cn from "../../../utils/functions/classHelperFn";

const titleVariant = cva(
	"block font-sans text-4xl font-semibold leading-tight tracking-normal text-blue-gray-900 antialiased",
	{
		variants: {
			size: {
				lg: "text-5xl",
				md: "text-4xl",
				sm: "text-3xl",
			},
		},
	}
);

interface props
	extends ComponentProps<"div">,
		VariantProps<typeof titleVariant> {}

const Title = ({ className, size, ...props }: props) => {
	return (
		<div className={cn(titleVariant({ size, className }))} {...props}>
			{props.children}
		</div>
	);
};

export default Title;
