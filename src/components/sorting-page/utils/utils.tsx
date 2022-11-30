import { ElementStates } from '../../../types/element-states';

export const minLen = 3;
export const maxLen = 17;

export const randomNumber = (min: number, max: number): number => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

// Генерирования последовательности чисел
export const generateRandomArr = (length: number): number[] => {
	return Array.from({ length }, () => {
		return randomNumber(0, 101);
	});
};

export type TArrWithState = {
	number: number;
	state: ElementStates;
};


