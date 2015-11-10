'use strict';

/**
 * Sets the description of the cordova project.
 *
 * @author Sam Verschueren	  <sam.verschueren@gmail.com>
 * @since  21 May 2015
 */

// module dependencies
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var Config = require('cordova-config');

// export the module
module.exports = function (description) {
	return through.obj(function (file, enc, cb) {
		if (description === undefined) {
			// If the description is not provided, throw an error.
			return cb(new gutil.PluginError('gulp-cordova-description', 'Please provide a description.'));
		}

		try {
			// Load the config.xml file
			var config = new Config(path.join(file.path, 'config.xml'));

			// Sets the description
			config.setDescription(description);

			// Write the config file
			config.write(function () {
				this.push(file);

				// Call the callback
				cb();
			}.bind(this));
		} catch (err) {
			// Oh no, something happened!
			cb(new gutil.PluginError('gulp-cordova-description', err.message));
		}
	});
};
