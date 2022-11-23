import { swap } from '../../../utils/utils';

export const reverseString = (str: string) => {
	const newStrArr: string[] = str.split('');

	let start = 0;
	let end = newStrArr.length - 1;

	while (start < end) {
		swap(newStrArr, start, end);

		start += 1;
		end -= 1;
	}
	return newStrArr.join('');
};


