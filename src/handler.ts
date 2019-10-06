function logError(message: string, errorCode: string) {
	console.error(`micri: ${message}`);
	console.error(`micri: https://github.com/OlliV/micri/blob/master/errors/${errorCode}.md`);
}

export default async function handler(file: string) {
	let mod;

	try {
		mod = await require(file); // Await to support exporting Promises

		if (mod && typeof mod === 'object') {
			mod = await mod.default; // Await to support es6 module's default export
		}
	} catch (err) {
		logError(`Error when importing ${file}: ${err.stack}`, 'invalid-entry');
		process.exit(1);
	}

	if (typeof mod !== 'function') {
		logError(`The file "${file}" does not export a function.`, 'no-export');
		process.exit(1);
	}

	return mod;
}