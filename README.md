    \  / _. |  _  ._ _|_ o ._   _
     \/ (_| | (/_ | | |_ | | | (/_

[![Build Status](https://secure.travis-ci.org/ded/valentine.png)](http://travis-ci.org/ded/valentine)
JavaScript's Sister, and protector — inspired by Underscore; Valentine provides you with type checking, functional iterators, and common utility helpers such as waterfalls, queues, and parallels; all utilizing native JavaScript methods (when available) for optimal speed.

Browser usage:

``` html
<script src="valentine.js"></script>
<script>
  v.forEach(['a', 'b', 'c'], function (letter) {

  })
</script>
```

Node users, install it:

    $ npm install valentine

Use it:

``` js
var v = require('valentine')

// showcase object style
v(['a', 'b', 'c']).map(function (letter) {
  return letter.toUpperCase()
}).join(' '); // => 'A B C'
```

API
---

<h3>iterators</h3>

  * v.each(ar || obj, callback[, scope])
  * v.map(ar || obj, callback[, scope])
  * v.every(ar, callback[, scope])
  * v.some(ar, callback[, scope])
  * v.filter(ar, callback[, scope])
  * v.reject(ar, callback[, scope])
  * v.indexOf(ar, item[, start])
  * v.lastIndexOf(ar, item[, start])
  * v.reduce(ar, callback, memo[, scope])
  * v.reduceRight(ar, callback, memo[, scope])

<h3>utility</h3>

  * v.extend(obj[, obj2[, obj3[...]]])
  * v.merge(ar1, ar2)
  * v.pluck(ar, key)
  * v.toArray(sparse)
  * v.size(ar)
  * v.find(ar, key)
  * v.compact(ar)
  * v.flatten(ar)
  * v.uniq(ar)
  * v.first(ar)
  * v.last(ar)
  * v.keys(obj)
  * v.values(obj)
  * v.trim(str)
  * v.bind(scope, fn, [curried args])
  * v.curry(fn, [curried args])
  * v.inArray(ar, needle)
  * v.parallel([fn args])

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

  * v.waterfall([fn args])

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

  * v.waterfall([fn1, fn2<, fn3>], callback)
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

<h3>type checking</h3>

  * v.is.fun(o)
  * v.is.str(o)
  * v.is.ele(o)
  * v.is.arr(o)
  * v.is.arrLike(o)
  * v.is.num(o)
  * v.is.bool(o)
  * v.is.args(o)
  * v.is.emp(o)
  * v.is.dat(o)
  * v.is.nan(o)
  * v.is.nil(o)
  * v.is.und(o)
  * v.is.obj(o)

Object Style
------

``` js
v(['a', 'b', 'c']).map(function (letter) {
  return letter.toUpperCase()
}); // => ['A', 'B', 'C']
```

Chains
------

``` js
v(['a', 'b', [['c']], 0, false,,,null,['a', 'b', 'c']])
  .chain().flatten().compact().uniq().map(function (letter) {
    return letter.toUpperCase()
  }).value(); // => ['A', 'B', 'C']
```

Ender Support
-------------
Don't have [Ender](http://ender.no.de)? Install it, and don't ever look back.

    $ [sudo] npm install ender -g

Then build valentine into your package

    $ ender build valentine

Have an existing Ender package? Include it:

    $ ender add valentine

Write code like a boss

``` js

// as a top level method
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

    $ npm install -d
    $ make
    $ make test
    $ open tests/index.html

*Happy iterating*!
