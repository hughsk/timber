# timber

A lean logging module, in the form of an `EventEmitter` with an identical API to `console`.

For those times when you need a little more than
[debug](https://npmjs.org/package/debug) but a little less than
[winston](https://npmjs.org/package/winston). Or you're just not ready to
commit.

Works in Node, or in the browser using [browserify](http://browserify.org).

## Installation

``` javascript
npm install timber
```

## Usage

Can be used entirely in place of console - instead of logging, however, the
instance will emit events based on the name of the method.

So `timber.log('hello', 'world')` will call the `log` event with
`('hello', 'world')` as the arguments.

**logger = require('timber')**

Returns a shared log instance.

**logger()**

Returns a clean log instance, without any listeners.

**logger('namespace')**

Returns a namespaced logger - creates a new one the first time, but will return
the same log instance with future uses.

**logger.on('method', callback)**

Listen to log calls on this instance. The event callback returns all of the
arguments used with the method - handle them however you like.

**logger.EVENTS**

A list of the supported events/methods, so you can do things like this:

``` javascript
var timber = require('timber')

// Makes timber act exactly like console
timber.EVENTS.forEach(function(name) {
  timber.on(name, console[name].bind(console))
})
```

## Example

``` javascript
var timber = require('timber')

timber.log('does nothing')

timber.on('log', console.log.bind(console))

timber.log('first log')
console.log('also log')

timber.on('warn', function(arg1, arg2) {
  console.warn(['warn:', arg2, arg1].join(' '))
})

timber.warn(404, 'warning!') // warn: warning! 404
```

