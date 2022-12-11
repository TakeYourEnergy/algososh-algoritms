export const swap = <T>(strArr: T[], i: number, j: number): void => {
	[strArr[i], strArr[j]] = [strArr[j], strArr[i]];
};

export const animationDelay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
