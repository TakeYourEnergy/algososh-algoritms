import { generateRandomArr } from '../utils/utils';
export const randomArr = generateRandomArr(4);

//создание узла
export class Node<T> {
	value: T;
	next: Node<T> | null;
	constructor(value: T, next?: Node<T> | null) {
		this.value = value;
		this.next = next === undefined ? null : next;
	}
}

interface ILinkedList<T> {
	append: (element: T) => void;
	getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
	private head: Node<T> | null;
	private size: number;
	constructor(arr: T[]) {
		this.head = null;
		this.size = 0;
		arr.forEach(element => this.append(element));
	}

	append(element: T) {
		const node = new Node(element);
		let current;

		if (this.head === null) {
			this.head = node;
		} else {
			current = this.head;
			while (current.next) {
				current = current.next;
			}

			current.next = node;
		}
		this.size++;
	}

	getSize() {
		return this.size;
	}
}

export const list = new LinkedList<string>(randomArr);
