import { CanMoveIn } from "../hooks/useGetMoves";

const getArrayFromObjOfArray = (obj: CanMoveIn) => {
	const array: string[] = [];
	Object.values(obj).forEach((move) => {
		// @ts-ignore comment
		array.push(...move);
	});
	return array;
};

export default getArrayFromObjOfArray;
