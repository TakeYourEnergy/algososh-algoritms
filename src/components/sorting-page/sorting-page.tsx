import React, { useEffect, useState } from 'react';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting.module.css';
import { generateRandomArr, maxLen, minLen, randomNumber, TArrWithState } from './utils/utils';
import { nanoid } from 'nanoid';
import { animationDelay } from '../../utils/utils';

export const SortingPage: React.FC = () => {
	const [isBubble, setIsBubble] = useState(false);
	const [arrWithState, setArrWithState] = useState<TArrWithState[]>([]);
	const [isDisabled, setDisabled] = useState<boolean>();

	const handleClickNewArrWithState = () => {
		setArrWithState(
			generateRandomArr(randomNumber(minLen, maxLen)).reduce((acc: TArrWithState[], item) => {
				return [...acc, { number: item, state: ElementStates.Default }];
			}, []),
		);
	};

	const selectionSort = async (
		inputArr: TArrWithState[],
		direction: 'desc' | 'asc',
	): Promise<TArrWithState[]> => {
		for (let i = 0; i < inputArr.length; i++) {
			let min = i;
			inputArr[min].state = ElementStates.Changing;
			for (let j = i + 1; j < inputArr.length; j++) {
				inputArr[j].state = ElementStates.Changing;
				setArrWithState([...inputArr]);
				await animationDelay(200);
				if (
					direction === 'desc'
						? inputArr[j].number > inputArr[min].number
						: inputArr[j].number < inputArr[min].number
				) {
					min = j;
				}
				inputArr[j].state = ElementStates.Default;
				setArrWithState([...inputArr]);
			}
			if (min !== i) {
				inputArr[min].state = ElementStates.Modified;
				inputArr[i].state = ElementStates.Default;
				[inputArr[i], inputArr[min]] = [inputArr[min], inputArr[i]];
			} else {
				inputArr[i].state = ElementStates.Modified;
			}
			setArrWithState([...inputArr]);
		}
		return inputArr;
	};

	const bubbleSort = async (
		inputArr: TArrWithState[],
		direction: 'desc' | 'asc',
	): Promise<TArrWithState[]> => {
		for (let i = 0; i < inputArr.length; i++) {
			for (let j = 0; j < inputArr.length - i - 1; j++) {
				inputArr[j].state = ElementStates.Changing;
				if (inputArr[j + 1]) {
					inputArr[j + 1].state = ElementStates.Changing;
				}
				setArrWithState([...inputArr]);
				await animationDelay(200);
				if (
					direction === 'asc'
						? inputArr[j].number > inputArr[j + 1].number
						: inputArr[j].number < inputArr[j + 1].number
				) {
					[inputArr[j].number, inputArr[j + 1].number] = [
						inputArr[j + 1].number,
						inputArr[j].number,
					];
				}
				inputArr[j].state = ElementStates.Default;
				if (inputArr[j + 1]) {
					inputArr[j + 1].state = ElementStates.Default;
				}
				inputArr[inputArr.length - i - 1].state = ElementStates.Modified;
				setArrWithState([...inputArr]);
			}
			inputArr[inputArr.length - 1].state = ElementStates.Modified;
			inputArr[0].state = ElementStates.Modified;
			setArrWithState([...inputArr]);
		}

		return inputArr;
	};

	useEffect(() => {
		handleClickNewArrWithState();
	}, []);

	const handleChange = () => {
		setIsBubble(!isBubble);
	};

	const handleClickSort = async (direction: 'desc' | 'asc'): Promise<void> => {
		setDisabled(true);
		if (isBubble) {
			setArrWithState(await bubbleSort(arrWithState, direction));
		} else {
			setArrWithState(await selectionSort(arrWithState, direction));
		}
		setDisabled(false);
	};

	return (
		<SolutionLayout title='Сортировка массива'>
			<form className={styles.form}>
				<div className={styles.radioInput}>
					<RadioInput
						label='Выбор'
						checked={!isBubble}
						onChange={handleChange}
						value='select-sort'
						disabled={isDisabled}
					/>
					<RadioInput
						label='Пузырёк'
						checked={isBubble}
						onChange={handleChange}
						value='bubble-sort'
						disabled={isDisabled}
					/>
				</div>
				<div className={styles.buttonsSort}>
					<Button
						text='По возрастанию'
						extraClass={styles.btnSize}
						sorting={Direction.Ascending}
						onClick={() => handleClickSort('asc')}
						disabled={isDisabled}
					/>
					<Button
						text='По убыванию'
						extraClass={styles.btnSize}
						sorting={Direction.Descending}
						onClick={() => handleClickSort('desc')}
						disabled={isDisabled}
					/>
				</div>
				<Button
					text='Новый массив'
					extraClass={styles.btnSize}
					onClick={handleClickNewArrWithState}
					disabled={isDisabled}
				/>
			</form>
			<div className={styles.columns}>
				{arrWithState.map(item => {
					return <Column key={nanoid()} index={item.number} state={item.state} />;
				})}
			</div>
		</SolutionLayout>
	);
};
