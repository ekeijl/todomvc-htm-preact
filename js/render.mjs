import { h } from 'preact';
import htm from 'htm';

/**
 * This binds htm to Preact, so we can write JSX-like syntax:
 * 
 * ```
 * import html from './render.mjs';
 * 
 * const MyComponent = ({name}) => {
 *  return html`<h1>Hello ${name}</h1>`;
 * }
 * ```
 *  */ 
export default htm.bind(h);
