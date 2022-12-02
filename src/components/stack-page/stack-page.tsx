import React, { useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack.module.css';

export const StackPage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<SolutionLayout title='Стек'>
			<form className={styles.form}>
				<div className={styles.inputWithAddAndDelete}>
					<Input
						maxLength={4}
						isLimitText={true}
						value={inputValue}
						extraClass={styles.input}
						onChange={handleChange}
					/>
					<Button text='Добавить' />
					<Button text='Удалить' />
				</div>
				<Button text='Очистить' />
			</form>
		</SolutionLayout>
	);
};
