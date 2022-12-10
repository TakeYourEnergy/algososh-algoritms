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
	prepend: (element: T) => void;
	getArr: () => T[];
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

	prepend(element: T): void {
		const node = new Node(element, this.head);

		this.head = node;
		this.size++;
	}

	getSize() {
		return this.size;
	}

	getArr() {
		let curr = this.head;
		let arr: T[] = [];
		while (curr) {
			arr.push(curr.value);
			curr = curr.next;
		}
		return arr;
	}
}

