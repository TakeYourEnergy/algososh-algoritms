
export const randomNumber = (min: number, max: number): string => {
	return String(Math.floor(min + Math.random() * (max + 1 - min)));
};

export const generateRandomArr = (length: number): string[] => {
	return Array.from({ length }, () => {
		return randomNumber(0, 100);
	});
};


