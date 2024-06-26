import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "../../../utils/functions/classHelperFn";
import Icon from "./../icon/Icon.";
import { props as IconProps } from "../icon/Icon.";

const buttonVariant = cva(
	" font-semibold hover:text-white py-2 px-4 rounded  disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			icon: {
				iconRight: "flex justify-center items-stretch",
				iconLeft: "flex flex-row-reverse justify-center items-stretch",
			},
		},
	}
);

interface props
	extends ComponentProps<"button">,
		VariantProps<typeof buttonVariant> {
	iconProps?: IconProps;
}

const Button = ({ icon, iconProps, className, ...props }: props) => {
	return (
		<button {...props} className={cn(buttonVariant({ icon, className }))}>
			{icon && <Icon id={iconProps!.type} {...iconProps} />}
			{props.children}
		</button>
	);
};

export default Button;
