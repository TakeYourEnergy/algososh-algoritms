export const fibo = (number: number) => {
	const arr = [1, 1];

	for (let i = 0; i < number - 2; i++) {
		arr.push(arr[i] + arr[i + 1]);
	}

	return arr;
};
