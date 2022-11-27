import { ElementStates } from '../../../types/element-states';

export const stateSircle = (index: number, operation: number, arr: Array<string>) => {
	if (index < operation || index > arr.length - 1 - operation) {
		return ElementStates.Modified;
	}
	if (index === operation || index === arr.length - 1 - operation) {
		return ElementStates.Changing;
	}
	return ElementStates.Default;
};
