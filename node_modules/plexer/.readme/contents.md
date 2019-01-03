
## Usage

### plexer([options,] writable, readable)

#### options
##### options.reemitErrors
Type: `Boolean`
Default value: `true`

Tells the duplexer to reemit given streams errors.

##### options.objectMode
Type: `Boolean`
Default value: `false`

Use if given in streams are in object mode. In this case, the duplexer will
 also be in the object mode.

##### options.*

Plexer inherits of Stream.Duplex, the options are passed to the
 parent constructor so you can use it's options too.

#### writable
Type: `Stream`

Required. Any writable stream.

#### readable
Type: `Stream`

Required. Any readable stream.

### plexer.obj([options], writable, readable)

A shortcut for `plexer({objectMode: true})`.

## Stats

[![NPM](https://nodei.co/npm/plexer.png?downloads=true&stars=true)](https://nodei.co/npm/plexer/)
[![NPM](https://nodei.co/npm-dl/plexer.png)](https://nodei.co/npm/plexer/)

## Contributing
Feel free to pull your code if you agree with publishing it under the MIT license.
