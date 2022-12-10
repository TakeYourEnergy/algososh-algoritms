import React, { useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { LinkedList } from './class/list-page';
import styles from './listPage.module.css';
import { nanoid } from 'nanoid';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { generateRandomArr } from './utils/utils';
import { animationDelay } from '../../utils/utils';

interface ISmallCircle {
	value: string;
	type: 'top' | 'bottom';
}

interface IListArrItem {
	value: string;
	smallCircle: ISmallCircle | undefined;
	state: ElementStates;
}

export const randomArr = generateRandomArr(4);
export const list = new LinkedList<string>(randomArr);

const getRandomListArr = (list: LinkedList<string>): IListArrItem[] => {
	return list.getArr().map(item => ({
		value: item,
		state: ElementStates.Default,
		smallCircle: undefined,
	}));
};

export const ListPage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [inputIndex, setInputIndex] = useState('');
	const [listArr, setListArr] = useState(getRandomListArr(list));

	console.log(listArr);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputIndex(e.target.value);
	};

	const addHead = async () => {
		list.prepend(inputValue);
		listArr[0].smallCircle = {
			value: inputValue,
			type: 'top',
		};
		setInputValue('');
		setListArr([...listArr]);
		await animationDelay(500);
		listArr[0].smallCircle = undefined;
		listArr.unshift({
			...listArr[0],
			value: inputValue,
			state: ElementStates.Modified,
		});
		setListArr([...listArr]);
		await animationDelay(500);
		listArr[0].state = ElementStates.Default;
		setListArr([...listArr]);
	};

	const addTail = async () => {
		list.append(inputValue);
		listArr[listArr.length - 1] = {
			...listArr[listArr.length - 1],
			smallCircle: {
				value: inputValue,
				type: 'top',
			},
		};
		setInputValue('');
		setListArr([...listArr]);
		await animationDelay(500);
		listArr[listArr.length - 1] = {
			...listArr[listArr.length - 1],
			smallCircle: undefined,
		};
		setListArr([...listArr]);
		listArr.push({
			value: inputValue,
			state: ElementStates.Modified,
			smallCircle: undefined,
		});
		setListArr([...listArr]);
		await animationDelay(500);
		listArr[listArr.length - 1].state = ElementStates.Default;
		setListArr([...listArr]);
	};

	return (
		<SolutionLayout title='Связный список'>
			<form className={styles.form}>
				<div className={styles.addDeleteHeadAndTail}>
					<Input
						value={inputValue}
						onChange={onChangeValue}
						placeholder='Введите текст'
						maxLength={4}
						isLimitText={true}
						extraClass={styles.input}
					/>
					<Button text='Добавить в head' extraClass={styles.btnHeadAndTail} onClick={addHead} />
					<Button text='Добавить в tail' extraClass={styles.btnHeadAndTail} onClick={addTail} />
					<Button text='Удалить из head' extraClass={styles.btnHeadAndTail} />
					<Button text='Удалить из tail' extraClass={styles.btnHeadAndTail} />
				</div>
				<div className={styles.addDeleteIndex}>
					<Input
						value={inputIndex}
						onChange={onChangeIndex}
						placeholder='Введите индекс'
						extraClass={styles.input}
					/>
					<Button text='Добавить по индексу' extraClass={styles.btnIndex} />
					<Button text='Удалить по индексу' extraClass={styles.btnIndex} />
				</div>
			</form>
			<div className={styles.list}>
				{listArr.map((item, index, arr) => {
					return (
						<div key={nanoid()} className={styles.circles}>
							<Circle
								letter={item.value}
								index={index}
								head={index === 0 ? 'head' : ''}
								tail={index === list.getSize() - 1 ? 'tail' : ''}
								state={item.state}
							/>
							{index < arr.length - 1 && <ArrowIcon fill={'#0032FF'} />}

							{item.smallCircle && (
								<div
									className={
										item.smallCircle.type === 'top'
											? styles.smallTopCircle
											: styles.smallBottomCircle
									}
								>
									<Circle
										letter={item.smallCircle.value}
										isSmall={true}
										state={ElementStates.Changing}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</SolutionLayout>
	);
};
