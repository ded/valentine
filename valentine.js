/*!
  * Valentine: JavaScript's Sister
  * copyright Dustin Diaz 2011 (@ded)
  * https://github.com/ded/valentine
  * License MIT
  */

!function (context) {

  var v = function (a, scope) {
        return new Valentine(a, scope);
      },
      ap = Array.prototype,
      op = Object.prototype,
      slice = ap.slice,
      nativ = !!('map' in ap),
      nativ18 = !!('reduce' in ap),
      trimReplace = /(^\s*|\s*$)/g;

  var iters = {
    each: nativ ?
      function (a, fn, scope) {
        ap.forEach.call(a, fn, scope);
      } :
      function (a, fn, scope) {
        for (var i = 0, l = a.length; i < l; i++) {
          fn.call(scope, a[i], i, a);
        }
      },
    map: nativ ?
      function (a, fn, scope) {
        return ap.map.call(a, fn, scope);
      } :
      function (a, fn, scope) {
        var r = [];
        for (var i = 0, l = a.length; i < l; i++) {
          r[i] = fn.call(scope, a[i], i, a);
        }
        return r;
      },
    some: nativ ?
      function (a, fn, scope) {
        return a.some(fn, scope);
      } :
      function (a, fn, scope) {
        for (var i = 0, l = a.length; i < l; i++) {
          if (fn.call(scope, a[i], i, a)) {
            return true;
          }
        }
        return false;
      },
    every: nativ ?
      function (a, fn, scope) {
        return a.every(fn, scope);
      } :
      function (a, fn, scope) {
        for (var i = 0, l = a.length; i < l; i++) {
          if (!fn.call(scope, a[i], i, a)) {
            return false;
          }
        }
        return true;
      },
    filter: nativ ?
      function (a, fn, scope) {
        return a.filter(fn, scope);
      } :
      function (a, fn, scope) {
        var r = [];
        for (var i = 0, j = 0, l = a.length; i < l; i++) {
          if (!fn.call(scope, a[i], i, a)) {
            continue;
          }
          r[j++] = a[i];
        }
        return r;
      },
    indexOf: nativ ?
      function (a, el, start) {
        return a.indexOf(el, isFinite(start) ? start : 0);
      } :
      function (a, el, start) {
        start = start || 0;
        for (var i = 0; i < a.length; i++) {
          if (a[i] === el) {
            return i;
          }
        }
        return -1;
      },

    lastIndexOf: nativ ?
      function (a, el, start) {
        return a.lastIndexOf(el, isFinite(start) ? start : a.length);
      } :
      function (a, el, start) {
        start = start || a.length;
        start = start >= a.length ? a.length :
          start < 0 ? a.length + start : start;
        for (var i = start; i >= 0; --i) {
          if (a[i] === el) {
            return i;
          }
        }
        return -1;
      },

    reduce: nativ18 ?
      function (o, i, m, c) {
        return ap.reduce.call(o, i, m, c);
      } :
      function (obj, iterator, memo, context) {
        var initial = !is.und(memo);
        !obj && (obj = []);
        iters.each(obj, function (value, index, list) {
          if (!initial && index === 0) {
            memo = value;
            initial = true;
          } else {
            memo = iterator.call(context, memo, value, index, list);
          }
        });
        if (!initial) {
          throw new TypeError("Reduce of empty array with no initial value");
        }
        return memo;
      },

    reduceRight: nativ18 ?
      function (o, i, m, c) {
        return ap.reduceRight.call(o, i, m, c);
      } :
      function (ob, i, m, c) {
        !ob && (ob = []);
        var reversed = (is.arr(ob) ? ob.slice() : o.toArray(ob)).reverse();
        return iters.reduce(reversed, i, m, c);
      },

    find: function (obj, iterator, context) {
      var result;
      iters.some(obj, function (value, index, list) {
        if (iterator.call(context, value, index, list)) {
          result = value;
          return true;
        }
      });
      return result;
    },

    reject: function (a, fn, scope) {
      var r = [];
      for (var i = 0, j = 0, l = a.length; i < l; i++) {
        if (fn.call(scope, a[i], i, a)) {
          continue;
        }
        r[j++] = a[i];
      }
      return r;
    },

    size: function (a) {
      return o.toArray(a).length;
    },

    pluck: function (a, k) {
      return iters.map(a, function (el) {
        return el[k];
      });
    },

    compact: function (a) {
      return iters.filter(a, function (value) {
        return !!value;
      });
    },

    flatten: function (a) {
      return iters.reduce(a, function (memo, value) {
        if (is.arr(value)) {
          return memo.concat(iters.flatten(value));
        }
        memo[memo.length] = value;
        return memo;
      }, []);
    },

    uniq: function (ar) {
      var a = [], i, j;
      label:
      for (i = 0; i < ar.length; i++) {
        for (j = 0; j < a.length; j++) {
          if (a[j] == ar[i]) {
            continue label;
          }
        }
        a[a.length] = ar[i];
      }
      return a;
    }

  };

  function aug(o, o2) {
    for (var k in o2) {
      o[k] = o2[k];
    }
  }

  var is = {
    fun: function (f) {
      return typeof f === 'function';
    },

    str: function (s) {
      return typeof s === 'string';
    },

    ele: function (el) {
      !!(el && el.nodeType && el.nodeType == 1);
    },

    arr: function (ar) {
      return ar instanceof Array;
    },

    num: function (n) {
      return typeof n === 'number';
    },

    bool: function (b) {
      return (b === true) || (b === false);
    },

    args: function (a) {
      return !!(a && op.hasOwnProperty.call(a, 'callee'));
    },

    emp: function (o) {
      var i = 0;
      return is.arr(o) ? o.length === 0 :
        is.obj(o) ? (function () {
          for (var k in o) {
            i++;
            break;
          }
          return (i === 0);
        }()) :
        o === '';
    },

    dat: function (d) {
      return !!(d && d.getTimezoneOffset && d.setUTCFullYear);
    },

    reg: function (r) {
      return !!(r && r.test && r.exec && (r.ignoreCase || r.ignoreCase === false));
    },

    nan: function (n) {
      return n !== n;
    },

    nil: function (o) {
      return o === null;
    },

    und: function (o) {
      return typeof o === 'undefined';
    },

    obj: function (o) {
      return o instanceof Object && !is.fun(o) && !is.arr(o);
    }
  };

  var o = {
    each: function (a, fn, scope) {
      is.arr(a) ?
        iters.each(a, fn, scope) : (function () {
          for (var k in a) {
            op.hasOwnProperty.call(a, k) && fn.call(scope, k, a[k], a);
          }
        }());
    },

    map: function (a, fn, scope) {
      var r = [], i = 0;
      return is.arr(a) ?
        iters.map(a, fn, scope) : !function () {
          for (var k in a) {
            op.hasOwnProperty.call(a, k) && (r[i++] = fn.call(scope, k, a[k], a));
          }
        }() && r;
    },

    toArray: function (a) {
      if (!a) {
        return [];
      }
      if (a.toArray) {
        return a.toArray();
      }
      if (is.arr(a)) {
        return a;
      }
      if (is.args(a)) {
        return slice.call(a);
      }
      return iters.map(a, function (k) {
        return k;
      });
    },

    first: function (a) {
      return a[0];
    },

    last: function (a) {
      return a[a.length - 1];
    },

    keys: Object.keys ?
      function (o) {
        return Object.keys(o);
      } :
      function (obj) {
        var keys = [];
        for (var key in obj) {
          op.hasOwnProperty.call(obj, key) && (keys[keys.length] = key);
        }
        return keys;
      },

    values: function (ob) {
      return o.map(ob, function (k, v) {
        return v;
      });
    },

    extend: function (ob) {
      o.each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          !is.und(source[prop]) && (ob[prop] = source[prop]);
        }
      });
      return ob;
    },

    trim: String.prototype.trim ?
      function (s) {
        return s.trim();
      } :
      function (s) {
        return s.replace(trimReplace, '');
      },

    bind: function (scope, fn) {
      return function () {
        fn.apply(scope, arguments);
      };
    }

  };

  aug(v, iters);
  aug(v, o);
  v.is = is;

  // love thyself
  v.v = v;

  // peoples like the object style
  var Valentine = function (a, scope) {
    this.val = a;
    this._scope = scope || null;
    this._chained = 0;
  };

  v.each(v.extend({}, iters, o), function (name, fn) {
    Valentine.prototype[name] = function () {
      var a = v.toArray(arguments);
      a.unshift(this.val);
      var ret = fn.apply(this._scope, a);
      this.val = ret;
      return this._chained ? this : ret;
    };
  });

  // back compact to underscore (peoples like chaining)
  Valentine.prototype.chain = function () {
    this._chained = 1;
    return this;
  };

  Valentine.prototype.value = function () {
    return this.val;
  };

  var old = context.v;
  v.noConflict = function () {
    context.v = old;
    return this;
  };

  (typeof module !== 'undefined') && module.exports ?
    (module.exports = v) :
    (context['v'] = v);

}(this);