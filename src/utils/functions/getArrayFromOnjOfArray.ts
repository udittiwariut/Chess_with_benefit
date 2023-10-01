import { EnemyMove } from "../../store/chessBoardSlice/chessBoreSlice";
const getArrayFromObjOfArray = (obj: EnemyMove) => {
	const array: string[] = [];
	const values = Object.values(obj);
	const keys = Object.keys(obj);

	values.forEach((move, i) => {
		// @ts-ignore comment
		move.forEach((val) => {
			if (val != keys[i]) array.push(val);
		});
	});

	return array;
};

export default getArrayFromObjOfArray;
