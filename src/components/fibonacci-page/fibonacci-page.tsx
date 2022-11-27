import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { animationDelay } from '../../utils/utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibo.module.css';
import { fibo } from './utils/fibo';

export const FibonacciPage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [arrFibo, setArrFibo] = useState<string[]>([]);
	console.log(inputValue);

	const printFiboNumbers = async (n: string) => {
		setIsLoading(true);
		setArrFibo([]);
		const templateArr = fibo(+n); //массив с числами фибоначчи
		for (let i = 0; i < templateArr.length; i++) {
			setArrFibo(prev => [...prev, String(templateArr[i])]);
			await animationDelay(500);
		}
		setIsLoading(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		printFiboNumbers(inputValue);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<SolutionLayout title='Последовательность Фибоначчи'>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input
					value={inputValue}
					onChange={handleChange}
					max={19}
					maxLength={2}
					isLimitText={true}
					disabled={isLoading}
					type='number'
				/>
				<Button
					text='Раcсчитать'
					type='submit'
					isLoader={isLoading}
					disabled={inputValue && +inputValue > 0 ? false : true}
				/>
			</form>
			<div className={styles.circles}>
				{arrFibo.map((number, index) => {
					return <Circle key={nanoid()} letter={number} index={index + 1} />;
				})}
			</div>
		</SolutionLayout>
	);
};
