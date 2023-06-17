#!/usr/bin/env node

/**
 * This Node script lists all files that should be cached by the service worker,
 * so it can continue to work in offline mode. The output can be copy-pasted in the service-worker.js file.
 * These files need to be listed manually, because the service-worker.js file cannot possibly know
 * which files it should cache during runtime.
 * This is a fragile approach that will break when the app is refactored.
 */
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const walk = async (dirPath) =>
	Promise.all(
		await readdir(dirPath, { withFileTypes: true }).then((entries) =>
			entries.map((entry) => {
				const childPath = join(dirPath, entry.name).replace(/\\/g, '/');
				return entry.isDirectory() ? walk(childPath) : childPath;
			})
		)
	);

// UPDATE THIS LIST AFTER CHANGING THE SOURCE CODE
const allFiles = await Promise.all([
  'index.html', 
  'manifest.json', 
  await walk('static'), 
  await walk('js')
]);

console.log(allFiles.flat(Infinity));
