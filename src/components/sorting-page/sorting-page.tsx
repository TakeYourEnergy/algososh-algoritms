import React, { useEffect, useState } from 'react';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting.module.css';
import { generateRandomArr, maxLen, minLen, randomNumber } from './utils/utils';
import { nanoid } from 'nanoid';

interface IArrItem {
	number: number;
	state: ElementStates;
}

export const SortingPage: React.FC = () => {
	const [checked, setChecked] = useState(false);
	const [arr, setArr] = useState<IArrItem[]>([]);
  console.log(arr)

	useEffect(() => {
		setArr([...generateRandomArr(randomNumber(minLen, maxLen))]);
	}, []);

	const handleClickNewArr = () => {
		setArr([...generateRandomArr(randomNumber(minLen, maxLen))]);
	};

	const handleChange = () => {
		setChecked(!checked);
	};
	return (
		<SolutionLayout title='Сортировка массива'>
			<form className={styles.form}>
				<div className={styles.radioInput}>
					<RadioInput label='Выбор' checked={!checked} onChange={handleChange} />
					<RadioInput label='Пузырёк' checked={checked} onChange={handleChange} />
				</div>
				<div className={styles.buttonsSort}>
					<Button text='По возрастанию' extraClass={styles.btnSize} sorting={Direction.Ascending} />
					<Button text='По убыванию' extraClass={styles.btnSize} sorting={Direction.Descending} />
				</div>
				<Button text='Новый массив' extraClass={styles.btnSize} onClick={handleClickNewArr} />
			</form>
			<div className={styles.columns}>
				{arr.map(item => {
					return <Column key={nanoid()} index={item.number} state={item.state} />;
				})}
			</div>
		</SolutionLayout>
	);
};
