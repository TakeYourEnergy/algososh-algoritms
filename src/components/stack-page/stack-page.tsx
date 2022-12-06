import React, { useState } from 'react';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { stack } from './class/stack';
import styles from './stack.module.css';
import { nanoid } from 'nanoid';
import { animationDelay } from '../../utils/utils';
import { ElementStates } from '../../types/element-states';

interface IIsDisabled {
	addItem: boolean;
	delItem: boolean;
}

export const StackPage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [arr, setArr] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDisabled, setDisabled] = useState<IIsDisabled>({
		addItem: false,
		delItem: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const add = async (value: string) => {
		setDisabled(prev => {
			return {
				...prev,
				addItem: true,
			};
		});
		stack.push(value);
		setArr(stack.getStack());
		setInputValue('');
		await animationDelay(500); //до делея - ElementStates.Changing, после ElementStates.Default
		setCurrentIndex(currentIndex + 1);
		setDisabled(prev => {
			return {
				...prev,
				addItem: false,
			};
		});
	};

	const del = async () => {
		setDisabled(prev => ({
			...prev,
			delItem: true,
		}));
		setCurrentIndex(stack.getIndex());
		await animationDelay(500);
		stack.pop();
		setArr([...stack.getStack()]);
		setDisabled(prev => ({
			...prev,
			delItem: false,
		}));
	};

	const clearArr = () => {
		stack.clear();
		setArr(stack.getStack());
		setCurrentIndex(0);
	};

	const getIndex = () => {
		return stack.getIndex();
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
					<Button
						text='Добавить'
						onClick={() => add(inputValue)}
						isLoader={isDisabled.addItem}
						disabled={!inputValue}
					/>
					<Button
						text='Удалить'
						onClick={() => del()}
						isLoader={isDisabled.delItem}
						disabled={stack.getSize() < 1 || isDisabled.addItem}
					/>
				</div>
				<Button
					text='Очистить'
					onClick={() => clearArr()}
					disabled={stack.getSize() < 1 || isDisabled.addItem || isDisabled.delItem}
				/>
			</form>
			<div className={styles.stack}>
				{arr.map((item, index) => {
					return (
						<Circle
							key={nanoid()}
							letter={item}
							index={index}
							state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
							head={getIndex() === index ? 'top' : ''}
						/>
					);
				})}
			</div>
		</SolutionLayout>
	);
};
