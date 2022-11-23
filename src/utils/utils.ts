export const swap = (strArr: string[], i: number, j: number) => {
	[strArr[i], strArr[j]] = [strArr[j], strArr[i]];
};
