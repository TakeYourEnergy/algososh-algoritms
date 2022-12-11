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
	deleteHead: () => void;
	deleteTail: () => void;
	addIndex: (element: T, position: number) => void;
	deleteIndex: (position: number) => void;
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

	deleteHead() {
		if (this.head) {
			this.head = this.head.next;
			this.size--;
		}
	}

	deleteTail() {
		let current;
		if (!this.head?.next) {
			this.head = null;
		} else {
			current = this.head;
			while (current.next?.next) {
				current = current.next;
			}
			current.next = null;
		}
		this.size--;
	}

	addIndex(element: T, index: number) {
		if (index < 0 || index > this.size) {
			return;
		}
		if (!this.head || index <= 0) {
			this.prepend(element);
		} else if (index >= this.size - 1) {
			this.append(element);
		} else {
			let current = this.head;
			let currentIndex = 0;

			while (currentIndex !== index - 1 && current.next) {
				current = current.next;
				currentIndex++;
			}

			const node = new Node(element, current.next);
			current.next = node;
			this.size++;
		}
	}

	deleteIndex(index: number) {
		if (index < 0 || index > this.size) {
			return;
		}
		let current = this.head;
		if (index === 0) {
			if (this.head) this.head = this.head?.next;
		} else {
			let prev = null;
			let currIndex = 0;
			while (currIndex++ < index) {
				prev = current;
				if (current) {
					current = current.next;
				}
			}
			if (prev?.next) prev.next = current?.next ? current.next : null;
		}
		this.size--;
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
