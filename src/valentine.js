!function (context) {

  var v = {},
      ap = Array.prototype,
      op = Object.prototype,
      nativ = !!('map' in ap);

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
        return ap.some.call(a, fn, scope);
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
        return ap.every.call(a, fn, scope);
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
        return ap.filter.call(a, fn, scope);
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
        return ap.indexOf.call(a, el, start);
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
        return ap.lastIndexOf.call(a, el, start);
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
    }
  };

  aug(v, iters);
  aug(v, o);
  v.is = is;

  var old = context.v;
  v.noConflict = function () {
    context.v = old;
    return this;
  };

  (typeof module !== 'undefined') && module.exports ?
    (module.exports = v) :
    (context.v = v);

}(this);