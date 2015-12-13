# gulp-cordova-description [![Build Status](https://travis-ci.org/SamVerschueren/gulp-cordova-description.svg)](https://travis-ci.org/SamVerschueren/gulp-cordova-description)

> Sets the description of the cordova project

## Installation

```
npm install --save-dev gulp-cordova-description
```


## Usage

```javascript
const gulp = require('gulp');
const create = require('gulp-cordova-create');
const description = require('gulp-cordova-description');

gulp.task('build', () => {
    return gulp.src('dist')
        .pipe(create())
        .pipe(description('This is the description of my application.'));
});
```

This will set the description tag in the `config.xml` file.


## API

### description(desc)

#### desc

*Required*  
Type: `string`

The description of the application.


## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.


## License

MIT © Sam Verschueren
