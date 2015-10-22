import os from 'os';
import path from 'path';
import fs from 'fs';
import test from 'ava';
import tempWrite from 'temp-write';
import gutil from 'gulp-util';
import fn from './';

const fixture = `<?xml version='1.0' encoding='utf-8'?><widget></widget>`;

function description(desc) {
    let file;

	return tempWrite(fixture, 'config.xml')
		.then(function (config) {
			file = config;

			return new Promise(function (resolve) {
				const stream = fn(desc);

				stream.on('data', function () {

				});

				stream.on('end', function (data) {
					resolve(fs.readFileSync(file).toString());
				});

				stream.write(new gutil.File({
					cwd: path.dirname(file),
					base: path.dirname(file),
					path: path.dirname(file),
					contents: new Buffer(fixture)
				}));

				stream.end();
			});
		})
		.then(function (result) {
			fs.unlinkSync(file);

			return result;
		});
}

test('description', async t => {
	t.is(await description('Foo Bar'), [
		'<?xml version=\'1.0\' encoding=\'utf-8\'?>',
		'<widget>',
        '    <description>Foo Bar</description>',
		'</widget>',
		''
	].join(os.EOL));
});

test('throw error if description is undefined', async t => {
	try {
		await description();
		t.fail('Should throw error');
	} catch (err) {
		t.ok(err);
	}
});
