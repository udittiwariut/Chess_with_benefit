import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "../../../utils/functions/classHelperFn";

const InputVariant = cva(
	"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
);

interface props
	extends ComponentProps<"input">,
		VariantProps<typeof InputVariant> {
	id?: string;
}

const Input = ({ className, ...props }: props) => {
	return <input {...props} className={cn(InputVariant({ className }))} />;
};

export default Input;
