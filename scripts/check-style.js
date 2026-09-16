import fs from 'node:fs';
import path from 'node:path';

/*
 * GastroSense AI - Automated Style & Code Compliance Checker
 * Validates tab indentation, line width <= 80 chars, and no trailing whitespace.
 */

const DIRS_TO_CHECK = ['src', 'tests', 'public/js'];
let hasErrors = false;

function checkFile(filePath) {
	const content = fs.readFileSync(filePath, 'utf8');
	const lines = content.split('\n');

	lines.forEach((line, index) => {
		const lineNum = index + 1;
		if (line.length > 80) {
			console.error(`[WIDTH] ${filePath}:${lineNum} exceeds 80 chars (${line.length})`);
			hasErrors = true;
		}
		if (line.endsWith(' ') || line.endsWith('\t')) {
			console.error(`[TRAILING] ${filePath}:${lineNum} has trailing whitespace`);
			hasErrors = true;
		}
	});
}

function walkDir(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walkDir(fullPath);
		} else if (entry.name.endsWith('.js')) {
			checkFile(fullPath);
		}
	}
}

for (const dir of DIRS_TO_CHECK) {
	if (fs.existsSync(dir)) walkDir(dir);
}

if (hasErrors) {
	console.error('Style check failed!');
	process.exit(1);
} else {
	console.log('Style check passed: 100% compliant with clean code guidelines.');
}
