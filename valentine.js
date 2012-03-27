/*!
  * Valentine: JavaScript's functional Sister
  * (c) Dustin Diaz 2011
  * https://github.com/ded/valentine
  * License MIT
  */

(function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function') define(definition)
  else this[name] = this['v'] = definition()
})('valentine', function () {

  var context = this
    , old = context.v
    , ap = []
    , hasOwn = Object.prototype.hasOwnProperty
    , n = null
    , slice = ap.slice
    , nativ = 'map' in ap
    , nativ18 = 'reduce' in ap
    , trimReplace = /(^\s*|\s*$)/g
    , iters = {
    each: nativ ?
      function (a, fn, scope) {
        ap.forEach.call(a, fn, scope)
      } :
      function (a, fn, scope) {
        for (var i = 0, l = a.length; i < l; i++) {
          i in a && fn.call(scope, a[i], i, a)
        }
      }

  , map: nativ ?
      function (a, fn, scope) {
        return ap.map.call(a, fn, scope)
      } :
      function (a, fn, scope) {
        var r = [], i
        for (i = 0, l = a.length; i < l; i++) {
          i in a && (r[i] = fn.call(scope, a[i], i, a))
        }
        return r
      }

  , some: nativ ?
      function (a, fn, scope) {
        return a.some(fn, scope)
      } :
      function (a, fn, scope) {
        for (var i = 0, l = a.length; i < l; i++) {
          if (i in a && fn.call(scope, a[i], i, a)) return true
        }
        return false
      }

  , every: nativ ?
      function (a, fn, scope) {
        return a.every(fn, scope)
      } :
      function (a, fn, scope) {
        for (var i = 0, l = a.length; i < l; i++) {
          if (i in a && !fn.call(scope, a[i], i, a)) return false
        }
        return true
      }

  , filter: nativ ?
      function (a, fn, scope) {
        return a.filter(fn, scope)
      } :
      function (a, fn, scope) {
        for (var r = [], i = 0, j = 0, l = a.length; i < l; i++) {
          if (i in a) {
            if (!fn.call(scope, a[i], i, a)) continue;
            r[j++] = a[i]
          }
        }
        return r
      }

  , indexOf: nativ ?
      function (a, el, start) {
        return a.indexOf(el, isFinite(start) ? start : 0)
      } :
      function (a, el, start) {
        start = start || 0
        for (var i = 0; i < a.length; i++) {
          if (i in a && a[i] === el) return i
        }
        return -1
      }

  , lastIndexOf: nativ ?
      function (a, el, start) {
        return a.lastIndexOf(el, isFinite(start) ? start : a.length)
      } :
      function (a, el, start) {
        start = start || a.length
        start = start >= a.length ? a.length :
          start < 0 ? a.length + start : start
        for (var i = start; i >= 0; --i) {
          if (i in a && a[i] === el) {
            return i
          }
        }
        return -1
      }

  , reduce: nativ18 ?
      function (o, i, m, c) {
        return ap.reduce.call(o, i, m, c);
      } :
      function (obj, iterator, memo, context) {
        if (!obj) obj = []
        var i = 0, l = obj.length
        if (arguments.length < 3) {
          do {
            if (i in obj) {
              memo = obj[i++]
              break;
            }
            if (++i >= l) {
              throw new TypeError('Empty array')
            }
          } while (1)
        }
        for (; i < l; i++) {
          if (i in obj) {
            memo = iterator.call(context, memo, obj[i], i, obj)
          }
        }
        return memo
      }

  , reduceRight: nativ18 ?
      function (o, i, m, c) {
        return ap.reduceRight.call(o, i, m, c)
      } :
      function (obj, iterator, memo, context) {
        !obj && (obj = [])
        var l = obj.length, i = l - 1
        if (arguments.length < 3) {
          do {
            if (i in obj) {
              memo = obj[i--]
              break;
            }
            if (--i < 0) {
              throw new TypeError('Empty array')
            }
          } while (1)
        }
        for (; i >= 0; i--) {
          if (i in obj) {
            memo = iterator.call(context, memo, obj[i], i, obj)
          }
        }
        return memo
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

  , uniq: function (ar) {
      var a = [], i, j
      label:
      for (i = 0; i < ar.length; i++) {
        for (j = 0; j < a.length; j++) {
          if (a[j] == ar[i]) {
            continue label
          }
        }
        a[a.length] = ar[i]
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

  var o = {
    each: function (a, fn, scope) {
      is.arrLike(a) ?
        iters.each(a, fn, scope) : (function () {
          for (var k in a) {
            hasOwn.call(a, k) && fn.call(scope, k, a[k], a)
          }
        }())
    }

  , map: function (a, fn, scope) {
      var r = [], i = 0
      return is.arrLike(a) ?
        iters.map(a, fn, scope) : !function () {
          for (var k in a) {
            hasOwn.call(a, k) && (r[i++] = fn.call(scope, k, a[k], a))
          }
        }() && r
    }

  , pluck: function (a, k) {
      return is.arrLike(a) ?
        iters.map(a, function (el) {
          return el[k]
        }) :
        o.map(a, function (_, v) {
          return v[k]
        })
    }

  , toArray: function (a) {
      if (!a) return []

      if (is.arr(a)) return a

      if (a.toArray) return a.toArray()

      if (is.args(a)) return slice.call(a)

      return iters.map(a, function (k) {
        return k
      })
    }

  , first: function (a) {
      return a[0]
    }

  , last: function (a) {
      return a[a.length - 1]
    }

  , keys: Object.keys ?
      function (o) {
        return Object.keys(o)
      } :
      function (obj) {
        var keys = [], key
        for (key in obj) if (hasOwn.call(obj, key)) keys[keys.length] = key
        return keys
      }

  , values: function (ob) {
      return o.map(ob, function (k, v) {
        return v
      })
    }

  , extend: function () {
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

  , trim: String.prototype.trim ?
      function (s) {
        return s.trim()
      } :
      function (s) {
        return s.replace(trimReplace, '')
      }

  , bind: function (scope, fn) {
      var args = arguments.length > 2 ? slice.call(arguments, 2) : null
      return function () {
        return fn.apply(scope, args ? args.concat(slice.call(arguments)) : arguments)
      }
    }

  , curry: function (fn) {
      if (arguments.length == 1) return fn
      var args = slice.call(arguments, 1)
      return function () {
        return fn.apply(null, args.concat(slice.call(arguments)))
      }
    }

  , parallel: function (fns, callback) {
      var args = o.toArray(arguments)
        , len = 0
        , returns = []
        , flattened = []

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

  , waterfall: function (fns, callback) {
      var args = o.toArray(arguments)
        , index = 0
      if (!is.arr(fns)) {
        callback = args.pop()
        fns = args
      }
      (function f() {
        var args = o.toArray(arguments)
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
  , queue: function (ar) {
      return new Queue(is.arrLike(ar) ? ar : o.toArray(arguments))
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


  v.noConflict = function () {
    context.v = old
    return this
  }

  return v
});