import React, { useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { reverseString } from './utils/utils';

export const StringComponent: React.FC = () => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<SolutionLayout title='Строка'>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input value={inputValue} onChange={handleChange} maxLength={11} isLimitText={true} />
				<Button text='Развернуть' type='submit' />
			</form>
		</SolutionLayout>
	);
};

