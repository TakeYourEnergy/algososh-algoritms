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

interface IStateLoader {
	addInHead: boolean;
	addInTail: boolean;
	deleteInHead: boolean;
	deleteInTail: boolean;
	addByIndex: boolean;
	deleteByIndex: boolean;
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
	const [disabled, setDisabled] = useState(false);
	const [isLoader, setIsLoader] = useState<IStateLoader>({
		addInHead: false,
		addInTail: false,
		deleteInHead: false,
		deleteInTail: false,
		addByIndex: false,
		deleteByIndex: false,
	});

	console.log(listArr);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputIndex(e.target.value);
	};

	const addHead = async () => {
		setIsLoader({ ...isLoader, addInHead: true });
		setDisabled(true);
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
		setIsLoader({ ...isLoader, addInHead: false });
		setDisabled(false);
	};

	const addTail = async () => {
		setIsLoader({ ...isLoader, addInTail: true });
		setDisabled(true);
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
		setIsLoader({ ...isLoader, addInTail: false });
		setDisabled(false);
	};

	const deleteHead = async () => {
		setIsLoader({ ...isLoader, deleteInHead: true });
		setDisabled(true);
		listArr[0] = {
			...listArr[0],
			value: '',
			smallCircle: {
				value: listArr[0].value,
				type: 'bottom',
			},
		};
		list.deleteHead();
		setListArr([...listArr]);
		await animationDelay(500);
		listArr.shift();
		setListArr([...listArr]);
		setIsLoader({ ...isLoader, deleteInHead: false });
		setDisabled(false);
	};

	const deleteTail = async () => {
		setIsLoader({ ...isLoader, deleteInTail: true });
		setDisabled(true);
		listArr[listArr.length - 1] = {
			...listArr[listArr.length - 1],
			value: '',
			smallCircle: {
				value: listArr[listArr.length - 1].value,
				type: 'bottom',
			},
		};
		list.deleteTail();
		setListArr([...listArr]);
		await animationDelay(500);
		listArr.pop();
		setListArr([...listArr]);
		setIsLoader({ ...isLoader, deleteInTail: false });
		setDisabled(false);
	};

	const addIndex = async () => {
		setIsLoader({ ...isLoader, addByIndex: true });
		setDisabled(true);
		const index = parseInt(inputIndex);
		if (index === list.getSize()) {
			setInputIndex('');
			addTail();
			return;
		}
		list.addIndex(inputValue, index);
		for (let i = 0; i <= index; i++) {
			listArr[i] = {
				...listArr[i],
				state: ElementStates.Changing,
				smallCircle: {
					value: inputValue,
					type: 'top',
				},
			};
			await animationDelay(500);
			setListArr([...listArr]);
			if (i > 0) {
				listArr[i - 1] = {
					...listArr[i - 1],
					smallCircle: undefined,
				};
			}
			setListArr([...listArr]);
		}
		await animationDelay(500);
		listArr[index] = {
			...listArr[index],
			state: ElementStates.Default,
			smallCircle: undefined,
		};
		listArr.splice(index, 0, {
			value: inputValue,
			state: ElementStates.Modified,
			smallCircle: undefined,
		});
		setListArr([...listArr]);
		listArr[index].state = ElementStates.Default;
		listArr.forEach(item => {
			item.state = ElementStates.Default;
		});
		await animationDelay(500);
		setListArr([...listArr]);
		setInputValue('');
		setInputIndex('');
		setIsLoader({ ...isLoader, addByIndex: false });
		setDisabled(false);
	};

	const deleteIndex = async () => {
		setIsLoader({ ...isLoader, deleteByIndex: true });
		setDisabled(true);
		const index = parseInt(inputIndex);
		list.deleteIndex(index);
		for (let i = 0; i <= index; i++) {
			listArr[i] = {
				...listArr[i],
				state: ElementStates.Changing,
			};
			await animationDelay(500);
			setListArr([...listArr]);
		}
		listArr[index] = {
			...listArr[index],
			value: '',
			smallCircle: {
				value: listArr[index].value,
				type: 'bottom',
			},
		};
		await animationDelay(500);
		setListArr([...listArr]);
		listArr.splice(index, 1);
		listArr[index - 1] = {
			...listArr[index - 1],
			value: listArr[index - 1].value,
			state: ElementStates.Modified,
			smallCircle: undefined,
		};
		await animationDelay(500);
		setListArr([...listArr]);
		listArr.forEach(elem => {
			elem.state = ElementStates.Default;
		});
		await animationDelay(500);
		setListArr([...listArr]);
		setInputIndex('');
		setIsLoader({ ...isLoader, deleteByIndex: false });
		setDisabled(false);
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
						disabled={disabled}
					/>
					<Button
						text='Добавить в head'
						extraClass={styles.btnHeadAndTail}
						onClick={addHead}
						isLoader={isLoader.addInHead}
						disabled={!inputValue || disabled || listArr.length >= 8}
					/>
					<Button
						text='Добавить в tail'
						extraClass={styles.btnHeadAndTail}
						onClick={addTail}
						disabled={!inputValue || disabled || listArr.length >= 8}
						isLoader={isLoader.addInTail}
					/>
					<Button
						text='Удалить из head'
						extraClass={styles.btnHeadAndTail}
						onClick={deleteHead}
						disabled={listArr.length <= 1 || disabled}
						isLoader={isLoader.deleteInHead}
					/>
					<Button
						text='Удалить из tail'
						extraClass={styles.btnHeadAndTail}
						onClick={deleteTail}
						disabled={listArr.length <= 1 || disabled}
						isLoader={isLoader.deleteInTail}
					/>
				</div>
				<div className={styles.addDeleteIndex}>
					<Input
						value={inputIndex}
						onChange={onChangeIndex}
						placeholder='Введите индекс'
						extraClass={styles.input}
						disabled={disabled}
						maxLength={1}
						max={8}
					/>
					<Button
						text='Добавить по индексу'
						extraClass={styles.btnIndex}
						onClick={addIndex}
						disabled={
							!inputValue ||
							!inputIndex ||
							disabled ||
							Number(inputIndex) > listArr.length - 1 ||
							listArr.length >= 8
						}
						isLoader={isLoader.addByIndex}
					/>
					<Button
						text='Удалить по индексу'
						extraClass={styles.btnIndex}
						onClick={deleteIndex}
						disabled={
							listArr.length === 0 ||
							disabled ||
							Number(inputIndex) > listArr.length - 1 ||
							Number(inputIndex) < 1
						}
						isLoader={isLoader.deleteByIndex}
					/>
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
