import { render } from 'preact';
import html from './render.mjs';
import { Header } from './Header/index.mjs';
import { Footer } from './Footer/index.mjs';
import { Todos } from './ToDo/index.mjs';

const App = () => {

	return html`
		<section class="todoapp">
			<${Header} />
			<section class="main">
				<${Todos} />
			</section>
		</section>

		<${Footer} />
	`;
};

render(html`<${App} />`, document.body);
