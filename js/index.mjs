import { html, render } from './modules.mjs';

import { Header } from './Header/index.mjs';
import { Footer } from './Footer/index.mjs';
import { List, useTodos, useFilter } from './ToDo/index.mjs';

const App = () => {
	const { todos } = useTodos();
	const filter = useFilter();

	return html`
		<section class="todoapp">
			<${Header} />
			${todos.length > 0 &&
			html`
				<section class="main">
					<${List} todos=${todos} filter=${filter} />
				</section>
			`}
		</section>

		<${Footer} />
	`;
};

render(html` <${App} />`, document.body);
