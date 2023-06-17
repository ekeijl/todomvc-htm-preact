import html from '../render.mjs';
import { Item } from './Item.mjs';
import { Footer } from './Footer.mjs';
import { store } from './store.mjs';
import { groupBy } from '../util/groupBy.mjs';
import { Filters } from './index.mjs';

/**
 * Shows the list of todo items and controls.
 * @param {Array<Object>} todos List of todo objects
 * @param {string} filter Active filter
 */
export const List = ({ todos, filter }) => {
	const grouped = groupBy(todos, 'status');

	const remaining = grouped[Filters.ACTIVE]?.length || 0;
	const completed = grouped[Filters.COMPLETED]?.length || 0;

	const filtered = !filter || filter === Filters.ALL ? todos : grouped[filter] || [];

	return html`
		<input
			class="toggle-all"
			id="toggle-all"
			type="checkbox"
			onChange=${() => store.toggleAll(remaining > 0)}
			checked=${remaining > 0 ? '' : 'checked'}
		/>
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			${filtered.map((todo) => html`<${Item} ...${todo} key=${todo.id} />`)}
		</ul>
		${todos.length > 0 && html` <${Footer} remaining=${remaining} completed=${completed} filter=${filter} /> `}
	`;
};
