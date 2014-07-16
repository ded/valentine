    \  / _. |  _  ._ _|_ o ._   _
     \/ (_| | (/_ | | |_ | | | (/_

[![Build Status](https://secure.travis-ci.org/ded/valentine.png)](http://travis-ci.org/ded/valentine)
JavaScript's Sister, and protector — inspired by Underscore; Valentine provides you with type checking, functional iterators, and common utility helpers such as waterfalls, queues, and parallels; all utilizing native JavaScript methods for optimal speed.

## Deprecation notice

As of version `2.0.0` — Valentine no longer supports `<= IE8` and `<= Safari 4`. It's been real, but time to move on. To access this level of support, use the [1.8 tag](https://github.com/ded/valentine/tree/v1.8.0).

### Browser usage:

``` html
<script src="valentine.js"></script>
<script>
  v.forEach(['a', 'b', 'c'], function (letter) {

  })
</script>
```

### Node users

``` sh
npm install valentine
```

``` js
var v = require('valentine')

// showcase object style
v(['a', 'b', 'c']).map(function (letter) {
  return letter.toUpperCase()
}).join(' '); // => 'A B C'
```

## API


<h3>iterators</h3>

  * v.each(array || object, callback[, scope]) => void
  * v.map(array || object, callback[, scope]) => array
  * v.every(array || object, *callback[, scope]) => boolean
  * v.some(array || object, *callback[, scope]) => boolean
  * v.filter(array || object, *callback[, scope]) => array || object

  * v.reject(ar, *callback[, scope])
  * v.indexOf(ar, item[, start])
  * v.lastIndexOf(ar, item[, start])
  * v.reduce(ar, **callback, memo[, scope])
  * v.reduceRight(ar, **callback, memo[, scope])

*`callback` is defined as:

``` js
// when array
function callback(item, index, array) {

}
// when object
function callback(key, value, object) {

}
```

**`calback` is defined as:

``` js
function callback(memo, item, index, array) {

}
```

### utility

  * v.extend(obj[, obj2[, obj3[...]]]) => object
  * v.merge(ar1, ar2) => array (ar1 modified)
  * v.pluck(array||object, key) => array
  * v.toArray(sparse) => array (duh)
  * v.size(array) => number
  * v.find(array, key) => *value
  * v.compact(array) => array
  * v.flatten(array) => array
  * v.uniq(array) => array
  * v.first(array) => *value
  * v.last(array) => *value
  * v.keys(object) => array
  * v.values(object) => array
  * v.trim(string) => string
  * v.bind(scope, fn, [curried args]) => function
  * v.curry(fn, [curried args]) => function
  * v.inArray(array, needle) => boolean
  * v.memo(fn, hasher) => function

``` js
// use memo to cache expensive methods
var getAllTheDom = v.memo(function () {
  return v(document.getElementsByTagName('*')).toArray()
})
getAllTheDom().each(modifier)
```

#### parallel api

  * v.parallel([fn args]) => void

``` js
v.parallel(
  function (fn) {
    getTimeline(function (e, timeline) {
      fn(e, timeline)
    })
  }
, function (fn) {
    getUser(function (e, user) {
      fn(e, user)
    })
  }
, function (e, timeline, user) {
    if (e) return console.log(e)
    ok(timeline == 'one', 'first result is "one"')
    ok(user == 'two', 'second result is "two"')
  }
)
```

#### waterfall api

  * v.waterfall([fn args])
  * v.waterfall([fn1, fn2<, fn3>], callback)

``` js
v.waterfall(
  function (callback) {
    callback(null, 'one', 'two')
  }
, function (a, b, callback) {
    console.log(a == 'one')
    console.log(b == 'two')
    callback(null, 'three')
  }
, function (c, callback) {
    console.log(c == 'three')
    callback(null, 'final result')
  }
, function (err, result) {
    console.log(!!err == false)
    console.log(result == 'final result')
  }
)
```

#### series api
  * similar to `waterfall` except passing along args to next function is not a concern
  * v.waterfall([fn1, fn2<, fn3>], callback)

``` js
v.waterfall(
  function (callback) {
    setTimeout(callback, 2000)
  }
, function (callback) {
    process.nextTick(callback)
  }
, function (callback) {
    callback(null)
  }
, function (err) {
    console.log('done')
  }
)
```

#### Queue api

  * v.queue([fn args])

``` js
var it = v.queue(
  function () {
    console.log('one')
    it.next()
  }
, function () {
    console.log('two')
    it.next()
  }
, function () {
    console.log('three')
  }
)
it.next()
```

#### throttle, debounce, throttleDebounce

  * v.throttle(ms, fn, opt_scope) => function
  * v.debounce(ms, fn, opt_scope) => function
  * v.throttleDebounce(throttleMs, debounceMs, fn, opt_scope) => function

``` js
window.onscroll = v.throttle(50, function (e) {
  // expensive scroll function
})

window.mousemove = v.debounce(500, function (e) {
  // user has paused momentarily
})

textarea.onkeypress = v.throttleDebounce(20000, 1000, function () {
  // autosave(this.value)
  // called after 1s if not called again within 1s
  // but guaranteed to be called within 20s
})
```

#### type checking
Each method returns a boolean

  * v.is.func(o)
  * v.is.string(o)
  * v.is.element(o)
  * v.is.array(o)
  * v.is.arrLike(o)
  * v.is.num(o)
  * v.is.bool(o)
  * v.is.args(o)
  * v.is.empty(o)
  * v.is.date(o)
  * v.is.nan(o)
  * v.is.nil(o)
  * v.is.undef(o)
  * is.regexp(o)
  * v.is.obj(o)

### Object Style

``` js
v(['a', 'b', 'c']).map(function (letter) {
  return letter.toUpperCase()
}); // => ['A', 'B', 'C']
```

### Chains

``` js
v(['a', 'b', [['c']], 0, false,,,null,['a', 'b', 'c']])
  .chain().flatten().compact().uniq().map(function (letter) {
    return letter.toUpperCase()
  }).value(); // => ['A', 'B', 'C']
```

## Ender Support

``` sh
ender add valentine
```

``` js

// available as a top level method on `$`
$.v(['a', ['virus'], 'b', 'c']).reject(function (el, i) {
  return $.is.arr(el[i])
})

// top level methods in bridge
$.each
  map
  merge
  extend
  toArray
  keys
  values
  trim
  bind
  curry
  parallel
  waterfall
  inArray
  queue
```

Or just require the valentine module

``` js
!function (v) {
  v(['a', ['virus'], 'b', 'c']).reject(function (el, i) {
    return v.is.arr(el[i])
  })
}(require('valentine'))
```

## Developers
Care to contribute? Make your edits to `src/valentine.js` and get your environment up and running

``` sh
npm install
make
make test
open tests/index.html
```

*Happy iterating*!
