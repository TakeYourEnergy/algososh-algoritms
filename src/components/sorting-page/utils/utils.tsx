import { ElementStates } from '../../../types/element-states';

export const minLen = 3;
export const maxLen = 17;

export const randomNumber = (min: number, max: number) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

// Генерирования последовательности чисел
export const generateRandomArr = (length: number) => {
	return Array.from({ length }, () => {
		return {
			number: randomNumber(0, 101),
			state: ElementStates.Default,
		};
	});
};
