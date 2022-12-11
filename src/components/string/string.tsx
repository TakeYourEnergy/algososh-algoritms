import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { animationDelay, swap } from '../../utils/utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { stateSircle } from './utils/utils';

export const StringComponent: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [arr, setArr] = useState<string[]>([]);
	const [operation, setOperation] = useState<number>(0);

	const printReverseString = async () => {
		setIsLoading(true);
		setOperation(0);

		const arrOfInput = inputValue.split('');
		setArr([...arrOfInput]); //чтобы на начальном экране появилось начальная строка
		await animationDelay(500); //задержка показа начальной строки

		let start = 0;
		let end = arrOfInput.length - 1;
		while (start <= end) {
			swap(arrOfInput, start, end);
			start += 1;
			end -= 1;
			setOperation(prev => prev + 1); //количество операций алгоритма
			setArr([...arrOfInput]); //используя метод указателей перемещаем элементы с задержкой
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
					: arr.map((letter, index, arr) => {
							return (
								<Circle key={nanoid()} letter={letter} state={stateSircle(index, operation, arr)} />
							);
					  })}
			</div>
		</SolutionLayout>
	);
};
