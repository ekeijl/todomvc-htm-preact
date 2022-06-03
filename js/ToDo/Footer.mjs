import { html } from '../modules.mjs';
import { store } from './index.mjs';
import { Filters } from './index.mjs';

/**
 * Shows number of remaining items.
 * @param {number} count
 */
const Remaining = ({ count }) =>
	html`<span class="todo-count"><strong>${count}</strong> item${count !== 1 && 's'} left</span>`;

/**
 * Filters and other controls.
 * @param {number} completed
 * @param {number} remaining
 * @param {string} filter
 */
export const Footer = ({ completed, remaining, filter }) => html`<footer class="footer">
	<${Remaining} count=${remaining} />
	<ul class="filters">
		${Object.values(Filters).map(
			(f) => html`<li>
				<a class=${filter === f && 'selected'} href=${'#/' + f}>${f.toUpperCase()}</a>
			</li>`
		)}
	</ul>
	${completed > 0 &&
	html`<button class="clear-completed" onClick=${() => store.clearCompleted()}>Clear completed</button>`}
</footer>`;
