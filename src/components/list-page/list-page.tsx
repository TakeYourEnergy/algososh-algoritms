import React, { useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { randomArr } from './class/list-page';
import styles from './listPage.module.css';
import { nanoid } from 'nanoid';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

export const randomListArr = randomArr.map(item => ({
	value: item,
	state: ElementStates.Default,
}));

export const ListPage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [inputIndex, setInputIndex] = useState('');
	const [listArr, setListArr] = useState(randomListArr);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputIndex(e.target.value);
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
					<Button text='Добавить в head' extraClass={styles.btnHeadAndTail} />
					<Button text='Добавить в tail' extraClass={styles.btnHeadAndTail} />
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
							<Circle letter={item.value} index={index} />
							{index < arr.length - 1 && <ArrowIcon fill={'#0032FF'} />}
						</div>
					);
				})}
			</div>
		</SolutionLayout>
	);
};
