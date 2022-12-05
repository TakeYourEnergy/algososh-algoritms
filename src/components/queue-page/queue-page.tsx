import React, { useState } from 'react';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { queue } from './class/queue';
import styles from './queuePage.module.css';
import { nanoid } from 'nanoid';

export const QueuePage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [queueArr, setQueueArr] = useState(queue.getQueue());

	console.log(queueArr);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const enqueue = async (item: string) => {
		queue.enqueue(item);
		setInputValue('');
		setQueueArr([...queue.getQueue()]);
	};

	const dequeue = async () => {};

	return (
		<SolutionLayout title='Очередь'>
			<form className={styles.form}>
				<div className={styles.inputWithAddAndDelete}>
					<Input
						maxLength={4}
						isLimitText={true}
						value={inputValue}
						extraClass={styles.input}
						onChange={handleChange}
					/>
					<Button text='Добавить' onClick={() => enqueue(inputValue)} />
					<Button text='Удалить' onClick={dequeue} />
				</div>
				<Button text='Очистить' />
			</form>
			<div className={styles.queue}>
				{queueArr.map((item, index) => {
					return <Circle key={nanoid()} index={index} letter={item} />;
				})}
			</div>
		</SolutionLayout>
	);
};
