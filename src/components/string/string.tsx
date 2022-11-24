import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { animationDelay, swap } from '../../utils/utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { reverseString } from './utils/utils';

export const StringComponent: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [arr, setArr] = useState<string[]>([]);
	console.log(arr);

	const printReverseString = async () => {
		const arrOfInput = inputValue.split('');

		setIsLoading(true);
		setArr([...arrOfInput]); //чтобы на начльном экране появилось начальная строка
		await animationDelay(500); //задержка показа начальной строки

		let start = 0;
		let end = arrOfInput.length - 1;
		while (start < end) {
			swap(arrOfInput, start, end);
			start += 1;
			end -= 1;
			setArr([...arrOfInput]); //используя метод указателей перемещаем элементы
			await animationDelay(1000);
		}
		setIsLoading(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		printReverseString();
		setInputValue('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<SolutionLayout title='Строка'>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input
					value={inputValue}
					onChange={handleChange}
					maxLength={11}
					isLimitText={true}
					disabled={isLoading}
				/>
				<Button text='Развернуть' type='submit' isLoader={isLoading} />
			</form>
			<div className={styles.circles}>
				{arr.length === 0
					? null
					: arr.map(letter => {
							return <Circle key={nanoid()} letter={letter} />;
					  })}
			</div>
		</SolutionLayout>
	);
};
