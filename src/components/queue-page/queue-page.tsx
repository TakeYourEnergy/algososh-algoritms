import React, { useState } from 'react';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { queue } from './class/queue';
import styles from './queuePage.module.css';
import { nanoid } from 'nanoid';
import { animationDelay } from '../../utils/utils';
import { ElementStates } from '../../types/element-states';

interface IIsDisabled {
	addItem: boolean;
	delItem: boolean;
}

export const QueuePage: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [queueArr, setQueueArr] = useState(queue.getQueue());
	const [tail, setTail] = useState(queue.getTail());
	const [currIndex, setCurrIndex] = useState(-1);
	const [head, setHead] = useState(queue.getHead());
	const [isDisabled, setDisabled] = useState<IIsDisabled>({
		addItem: false,
		delItem: false,
	});
	console.log(queueArr);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const enqueue = async (item: string) => {
		setDisabled(prev => ({
			...prev,
			addItem: true,
		}));
		queue.enqueue(item);
		setInputValue('');
		setQueueArr([...queue.getQueue()]);
		setTail(queue.getTail());
		setCurrIndex(tail % queue.getSize());
		await animationDelay(500);
		setCurrIndex(-1);
		setDisabled(prev => ({
			...prev,
			addItem: false,
		}));
	};

	const dequeue = async () => {
		setDisabled(prev => ({
			...prev,
			delItem: true,
		}));
		if (queue.getLength() > 0) {
			queue.dequeue();
			setQueueArr([...queue.getQueue()]);
			setCurrIndex(queue.getHead() % queue.getSize());
			await animationDelay(500);
			setHead(queue.getHead());
			setCurrIndex(-1);
		}
		setDisabled(prev => ({
			...prev,
			delItem: false,
		}));
	};

	const clear = () => {
		setDisabled(prev => ({
			...prev,
			clearItems: true,
		}));
		queue.clear();
		setQueueArr([...queue.getQueue()]);
		setHead(queue.getHead());
		setTail(queue.getTail());
		setDisabled(prev => ({
			...prev,
			clearItems: false,
		}));
	};

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
					<Button
						text='Добавить'
						onClick={() => enqueue(inputValue)}
						isLoader={isDisabled.addItem}
						disabled={!inputValue || tail === 7}
					/>
					<Button
						text='Удалить'
						onClick={dequeue}
						isLoader={isDisabled.delItem}
						disabled={(!inputValue && !queue.getLength()) || head === 7}
					/>
				</div>
				<Button text='Очистить' onClick={() => clear()} disabled={head === 0 && tail === 0} />
			</form>
			<div className={styles.queue}>
				{queueArr.map((item, index) => {
					return (
						<Circle
							key={nanoid()}
							index={index}
							letter={item}
							state={index === currIndex ? ElementStates.Changing : ElementStates.Default}
							head={index === head && queue.isEmpty() === false ? 'head' : ''}
							tail={index === tail - 1 && queue.isEmpty() === false ? 'tail' : ''}
						/>
					);
				})}
			</div>
		</SolutionLayout>
	);
};
