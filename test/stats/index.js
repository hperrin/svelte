import * as fs from 'fs';
import assert from 'assert';
import { svelte, loadConfig, tryToLoadJson } from '../helpers.js';

describe('stats', () => {
	fs.readdirSync('test/stats/samples').forEach(dir => {
		if (dir[0] === '.') return;

		// add .solo to a sample directory name to only run that test
		const solo = /\.solo/.test(dir);
		const skip = /\.skip/.test(dir);

		if (solo && process.env.CI) {
			throw new Error('Forgot to remove `solo: true` from test');
		}

		(solo ? it.only : skip ? it.skip : it)(dir, () => {
			const config = loadConfig(`./stats/samples/${dir}/_config.js`);
			const filename = `test/stats/samples/${dir}/input.html`;
			const input = fs.readFileSync(filename, 'utf-8').replace(/\s+$/, '');

			const expectedWarnings =
				tryToLoadJson(`test/stats/samples/${dir}/warnings.json`) || [];
			const expectedError = tryToLoadJson(
				`test/stats/samples/${dir}/error.json`
			);

			let result;
			let error;

			try {
				result = svelte.compile(input, config.options);
			} catch (e) {
				error = e;
			}

			config.test(assert, result.stats);

			if (result.stats.warnings.length || expectedWarnings.length) {
				// TODO check warnings are added to stats.warnings
			}

			if (error || expectedError) {
				if (error && !expectedError) {
					throw error;
				}

				if (expectedError && !error) {
					throw new Error(`Expected an error: ${expectedError.message}`);
				}

				assert.equal(error.message, expectedError.message);
				assert.deepEqual(error.start, expectedError.start);
				assert.deepEqual(error.end, expectedError.end);
				assert.equal(error.pos, expectedError.pos);
			}
		});
	});
});
