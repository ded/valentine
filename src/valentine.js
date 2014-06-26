(function (name, context, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function') define(definition)
  else context[name] = context['v'] = definition()
})('valentine', this, function () {

  var ap = []
    , hasOwn = Object.prototype.hasOwnProperty
    , n = null
    , slice = ap.slice
    , nativ = 'map' in ap
    , nativ18 = 'reduce' in ap

  var iters = {
    each: function (a, fn, scope) {
      ap.forEach.call(a, fn, scope)
    }

  , map: function (a, fn, scope) {
      return ap.map.call(a, fn, scope)
    }

  , some: function (a, fn, scope) {
      return a.some(fn, scope)
    }

  , every: function (a, fn, scope) {
      return a.every(fn, scope)
    }

  , filter: function (a, fn, scope) {
      return a.filter(fn, scope)
    }
  , indexOf: function (a, el, start) {
      return a.indexOf(el, isFinite(start) ? start : 0)
    }

  , lastIndexOf: function (a, el, start) {
      return a.lastIndexOf(el, isFinite(start) ? start : a.length)
    }

  , reduce: function (o, i, m, c) {
      return ap.reduce.call(o, v.bind(c, i), m);
    }

  , reduceRight: function (o, i, m, c) {
      return ap.reduceRight.call(o, v.bind(c, i), m)
    }

  , find: function (obj, iterator, context) {
      var result
      iters.some(obj, function (value, index, list) {
        if (iterator.call(context, value, index, list)) {
          result = value
          return true
        }
      })
      return result
    }

  , reject: function (a, fn, scope) {
      var r = []
      for (var i = 0, j = 0, l = a.length; i < l; i++) {
        if (i in a) {
          if (fn.call(scope, a[i], i, a)) {
            continue;
          }
          r[j++] = a[i]
        }
      }
      return r
    }

  , size: function (a) {
      return o.toArray(a).length
    }

  , compact: function (a) {
      return iters.filter(a, function (value) {
        return !!value
      })
    }

  , flatten: function (a) {
      return iters.reduce(a, function (memo, value) {
        if (is.arr(value)) {
          return memo.concat(iters.flatten(value))
        }
        memo[memo.length] = value
        return memo
      }, [])
    }

  , uniq: function (ar, opt_iterator) {
      if (ar == null) return []
      var a = [], seen = []
      for (var i = 0, length = ar.length; i < length; i++) {
        var value = ar[i]
        if (opt_iterator) value = opt_iterator(value, i, ar)
        if (!iters.inArray(seen, value)) {
          seen.push(value)
          a.push(ar[i])
        }
      }
      return a
    }

  , merge: function (one, two) {
      var i = one.length, j = 0, l
      if (isFinite(two.length)) {
        for (l = two.length; j < l; j++) {
          one[i++] = two[j]
        }
      } else {
        while (two[j] !== undefined) {
          first[i++] = second[j++]
        }
      }
      one.length = i
      return one
    }

  , inArray: function (ar, needle) {
      return !!~iters.indexOf(ar, needle)
    }

  , memo: function (fn, hasher) {
      var store = {}
      hasher || (hasher = function (v) {
        return v
      })
      return function () {
        var key = hasher.apply(this, arguments)
        return hasOwn.call(store, key) ? store[key] : (store[key] = fn.apply(this, arguments))
      }
    }
  }

  var is = {
    fun: function (f) {
      return typeof f === 'function'
    }

  , str: function (s) {
      return typeof s === 'string'
    }

  , ele: function (el) {
      return !!(el && el.nodeType && el.nodeType == 1)
    }

  , arr: function (ar) {
      return ar instanceof Array
    }

  , arrLike: function (ar) {
      return (ar && ar.length && isFinite(ar.length))
    }

  , num: function (n) {
      return typeof n === 'number'
    }

  , bool: function (b) {
      return (b === true) || (b === false)
    }

  , args: function (a) {
      return !!(a && hasOwn.call(a, 'callee'))
    }

  , emp: function (o) {
      var i = 0
      return is.arr(o) ? o.length === 0 :
        is.obj(o) ? (function () {
          for (var k in o) {
            i++
            break;
          }
          return (i === 0)
        }()) :
        o === ''
    }

  , dat: function (d) {
      return !!(d && d.getTimezoneOffset && d.setUTCFullYear)
    }

  , reg: function (r) {
      return !!(r && r.test && r.exec && (r.ignoreCase || r.ignoreCase === false))
    }

  , nan: function (n) {
      return n !== n
    }

  , nil: function (o) {
      return o === n
    }

  , und: function (o) {
      return typeof o === 'undefined'
    }

  , def: function (o) {
      return typeof o !== 'undefined'
    }

  , obj: function (o) {
      return o instanceof Object && !is.fun(o) && !is.arr(o)
    }
  }

  // nicer looking aliases
  is.empty = is.emp
  is.date = is.dat
  is.regexp = is.reg
  is.element = is.ele
  is.array = is.arr
  is.string = is.str
  is.undef = is.und
  is.func = is.fun

  var o = {
    each: function each(a, fn, scope) {
      is.arrLike(a) ?
        iters.each(a, fn, scope) : (function () {
          for (var k in a) {
            hasOwn.call(a, k) && fn.call(scope, k, a[k], a)
          }
        }())
    }

  , map: function map(a, fn, scope) {
      var r = [], i = 0
      return is.arrLike(a) ?
        iters.map(a, fn, scope) : !function () {
          for (var k in a) {
            hasOwn.call(a, k) && (r[i++] = fn.call(scope, k, a[k], a))
          }
        }() && r
    }

  , some: function some(a, fn, scope) {
      if (is.arrLike(a)) return iters.some(a, fn, scope)
      for (var k in a) {
        if (hasOwn.call(a, k) && fn.call(scope, k, a[k], a)) {
          return true
        }
      }
      return false

    }

  , every: function every(a, fn, scope) {
      if (is.arrLike(a)) return iters.every(a, fn, scope)
      for (var k in a) {
        if (!(hasOwn.call(a, k) && fn.call(scope, k, a[k], a))) {
          return false
        }
      }
      return true
    }

  , filter: function filter(a, fn, scope) {
      var r = {}, k
      if (is.arrLike(a)) return iters.filter(a, fn, scope)
      for (k in a) {
        if (hasOwn.call(a, k) && fn.call(scope, k, a[k], a)) {
          r[k] = a[k]
        }
      }
      return r
    }

  , pluck: function pluck(a, k) {
      return is.arrLike(a) ?
        iters.map(a, function (el) {
          return el[k]
        }) :
        o.map(a, function (_, v) {
          return v[k]
        })
    }

  , toArray: function toArray(a) {
      if (!a) return []

      if (is.arr(a)) return a

      if (a.toArray) return a.toArray()

      if (is.args(a)) return slice.call(a)

      return iters.map(a, function (k) {
        return k
      })
    }

  , first: function first(a) {
      return a[0]
    }

  , last: function last(a) {
      return a[a.length - 1]
    }

  , keys: Object.keys
  , values: function (ob) {
      return o.map(ob, function (k, v) {
        return v
      })
    }

  , extend: function extend() {
      // based on jQuery deep merge
      var options, name, src, copy, clone
        , target = arguments[0], i = 1, length = arguments.length

      for (; i < length; i++) {
        if ((options = arguments[i]) !== n) {
          // Extend the base object
          for (name in options) {
            src = target[name]
            copy = options[name]
            if (target === copy) {
              continue;
            }
            if (copy && (is.obj(copy))) {
              clone = src && is.obj(src) ? src : {}
              target[name] = o.extend(clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
      return target
    }

  , trim: function (s) {
      return s.trim()
    }

  , bind: function (scope, fn) {
      var args = arguments.length > 2 ? slice.call(arguments, 2) : null
      return function () {
        return fn.apply(scope, args ? args.concat(slice.call(arguments)) : arguments)
      }
    }

  , curry: function curry(fn) {
      if (arguments.length == 1) return fn
      var args = slice.call(arguments, 1)
      return function () {
        return fn.apply(null, args.concat(slice.call(arguments)))
      }
    }

  , parallel: function parallel(fns, callback) {
      var args = o.toArray(arguments)
        , len = 0
        , returns = []
        , flattened = []

      if (is.arr(fns) && fns.length === 0 || (is.fun(fns) && args.length === 1)) throw new TypeError('Empty parallel array')
      if (!is.arr(fns)) {
        callback = args.pop()
        fns = args
      }

      iters.each(fns, function (el, i) {
        el(function () {
          var a = o.toArray(arguments)
            , e = a.shift()
          if (e) return callback(e)
          returns[i] = a
          if (fns.length == ++len) {
            returns.unshift(n)

            iters.each(returns, function (r) {
              flattened = flattened.concat(r)
            })

            callback.apply(n, flattened)
          }
        })
      })
    }

  , waterfall: function waterfall(fns, callback) {
      var args = o.toArray(arguments)
        , index = 0

      if (is.arr(fns) && fns.length === 0 || (is.fun(fns) && args.length === 1)) throw new TypeError('Empty waterfall array')
      if (!is.arr(fns)) {
        callback = args.pop()
        fns = args
      }

      (function f() {
        var args = o.toArray(arguments)
        if (!args.length) args.push(null) // allow callbacks with no args as passable non-errored functions
        args.push(f)
        var err = args.shift()
        if (!err && fns.length) fns.shift().apply(n, args)
        else {
          args.pop()
          args.unshift(err)
          callback.apply(n, args)
        }
      }(n))
    }

  , queue: function queue(ar) {
      return new Queue(is.arrLike(ar) ? ar : o.toArray(arguments))
    }

  , debounce: function debounce(wait, fn, opt_scope) {
      var timeout
      function caller() {
        var args = arguments
          , context = opt_scope || this
        function later() {
          timeout = null
          fn.apply(context, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }

      // cancelation method
      caller.cancel = function debounceCancel() {
        clearTimeout(timeout)
        timeout = null
      }

      return caller
    }

  , throttle: function throttle(wait, fn, opt_scope) {
      var timeout
      return function throttler() {
        var context = opt_scope || this
          , args = arguments
        if (!timeout) {
          timeout = setTimeout(function throttleTimeout() {
              fn.apply(context, args)
              timeout = null
            },
            wait
          )
        }
      }
    }

  , throttleDebounce: function (throttleMs, debounceMs, fn, opt_scope) {
      var args
        , context
        , debouncer
        , throttler

      function caller() {
        args = arguments
        context = opt_scope || this

        clearTimeout(debouncer)
        debouncer = setTimeout(function () {
          clearTimeout(throttler)
          throttler = null
          fn.apply(context, args)
        }, debounceMs)

        if (!throttler) {
          throttler = setTimeout(function () {
            clearTimeout(debouncer)
            throttler = null
            fn.apply(context, args)
          }, throttleMs)
        }
      }

      // cancelation method
      caller.cancel = function () {
        clearTimeout(debouncer)
        clearTimeout(throttler)
        throttler = null
      }

      return caller
    }
  }

  function Queue (a) {
    this.values = a
    this.index = 0
  }

  Queue.prototype.next = function () {
    this.index < this.values.length && this.values[this.index++]()
    return this
  }

  function v(a, scope) {
    return new Valentine(a, scope)
  }

  function aug(o, o2) {
    for (var k in o2) o[k] = o2[k]
  }

  aug(v, iters)
  aug(v, o)
  v.is = is

  v.v = v // vainglory

  // peoples like the object style
  function Valentine(a, scope) {
    this.val = a
    this._scope = scope || n
    this._chained = 0
  }

  v.each(v.extend({}, iters, o), function (name, fn) {
    Valentine.prototype[name] = function () {
      var a = v.toArray(arguments)
      a.unshift(this.val)
      var ret = fn.apply(this._scope, a)
      this.val = ret
      return this._chained ? this : ret
    }
  })

  // people like chaining
  aug(Valentine.prototype, {
    chain: function () {
      this._chained = 1
      return this
    }
  , value: function () {
      return this.val
    }
  })

  return v
});
