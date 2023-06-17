import { v4 } from 'uuid';
import { proxy, subscribe } from 'valtio';
import { Filters } from './index.mjs';

const KEY = 'todos-htm-preact';

/**
 * Attempts to read items from localstorage.
 * @returns {Array<Object>} Array of todo items
 */
const read = () => {
	let data;
	try {
		data = JSON.parse(localStorage.getItem(KEY)) || [];
	} catch (e) {
		console.error('Invalid JSON', e);
		data = [];
	}
	return data;
};

/**
 * Writes todo items to localstorage.
 * @param {Array<Object} data 
 */
const write = (data) => {
	localStorage.setItem(KEY, JSON.stringify(data));
};

export const store = proxy({
	todos: read(),

	reset(todos = []) {
		this.todos = todos.map(({ id = v4(), status = Filters.ACTIVE, ...todo }) => ({ id, status, ...todo }));
	},
	add(name) {
		this.todos = [{ id: v4(), status: Filters.ACTIVE, name }, ...this.todos];
	},
	updateItem(id, change) {
		this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, ...change } : todo));
	},
	toggleAll(isComplete) {
		this.todos = this.todos.map((todo) => ({ ...todo, status: isComplete ? Filters.COMPLETED : Filters.ACTIVE }));
	},
	toggle(id) {
		this.todos = this.todos.map((todo) =>
			todo.id === id
				? { ...todo, status: todo.status === Filters.COMPLETED ? Filters.ACTIVE : Filters.COMPLETED }
				: todo
		);
	},
	clearCompleted() {
		this.todos = this.todos.filter(({ status }) => status !== Filters.COMPLETED);
	},
	remove(removeId) {
		this.todos = this.todos.filter(({ id }) => id !== removeId);
	}
});

// Write any state change to localStorage
subscribe(store, () => write(store.todos));

