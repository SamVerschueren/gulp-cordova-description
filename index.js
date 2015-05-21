'use strict';

/**
 * Sets the description of the cordova project.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  21 May 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Config = require('cordova-config');

// export the module
module.exports = function(description) {

    var project;

    return through.obj(function(file, enc, cb) {
        project = file;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        if(description === undefined) {
            // If the description is not provided, throw an error.
            return cb(new gutil.PluginError('gulp-cordova-description', 'Please provide a description.'));
        }

        try {
            // Load the config.xml file
            var config = new Config(path.join(project.path, 'config.xml'));

			// Sets the description
            config.setDescription(description);

            // Write the config file
            config.write(function() {
				// Call the callback
				cb();
			});
        }
        catch(err) {
			// Oh no, something happened!
            cb(new gutil.PluginError('gulp-cordova-description', err.message));
        }
    });
};
