export const swap = (strArr: string[], i: number, j: number) => {
	[strArr[i], strArr[j]] = [strArr[j], strArr[i]];
};

export const animationDelay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
