var EventEmitter = require('events').EventEmitter
  , funstance = require('funstance')
  , inherits = require('inherits')

function Timber() {
  this.on('error', function(){})
}
inherits(Timber, EventEmitter)

function logEmit(eventName) {
  return function emit() {
    this.emit.apply(this, [eventName].concat(Array.prototype.slice.call(arguments)))
  }
}

Timber.prototype.EVENTS = [
  'log'
, 'debug'
, 'info'
, 'warn'
, 'error'
, 'assert'
, 'group'
, 'groupCollapsed'
, 'groupEnd'
, 'clear'
, 'dir'
, 'trace'
, 'time'
, 'timeEnd'
, 'timeStamp'
, 'profile'
, 'count'
, 'exception'
, 'table'
].map(function(name) {
  Timber.prototype[name] = logEmit(name)
  return name
})

var cache = {}

function createLogger(name) {
  if (name) return cache[name] || (cache[name] = createLogger())
  return funstance(new Timber, createLogger)
}

module.exports = createLogger()
