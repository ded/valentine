if (typeof module !== 'undefined' && module.exports) {
  var s = require('../build/sink'),
      start = s.start,
      sink = s.sink;
  var v = require('../src/valentine');
}

sink('Arrays', function(test, ok, before, after) {
  test('each', 3, function () {
    v.each(['a', 'b'], function (el, i, ar) {
      ok(el == ar[i], 'each of arrays ' + i);
    });
    v.each({ foo: 'bar' }, function (k, v, ar) {
      ok(v == ar[k], 'each of objects');
    });
  });

  test('map', 2, function () {
    var m = v.map(['a', 'b'], function (el) {
      return el.toUpperCase();
    });

    ok(m[0] === 'A' && m[1] === 'B', 'map of arrays');

    var om = v.map({
      foo: 'bar',
      baz: 'thunk'
    }, function (k, v) {
      return v;
    });

    ok(om[0] === 'bar' && om[1] === 'thunk', 'map of objects');

  });

  test('every', 2, function () {
    var a1 = ['a', 'a', 'a'];
    var a2 = ['a', 'a', 'b'];

    ok(v.every(a1, function (el) {
      return el == 'a'
    }), 'all elements in array are "a"');

    ok(!v.every(a2, function (el) {
      return el == 'a'
    }), 'all elements in array are not "a"');
  });

  test('some', 2, function () {
    var a1 = ['a', 'a', 'a'];
    var a2 = ['a', 'a', 'b'];

    ok(!v.some(a1, function (el) {
      return el == 'b'
    }), 'no elements in array have "b"');

    ok(v.some(a2, function (el) {
      return el == 'b'
    }), 'some elements in array have "b"');
  });

  test('filter', 1, function () {
    var a = v.filter(['a', 'b', 'virus', 'c'], function (el) {
      return el !== 'virus';
    });
    var expected = ['a', 'b', 'c'];
    ok(v.every(expected, function (el, i) {
      return el == a[i];
    }), 'filters out viruses');
  });

  test('indexOf', 2, function () {
    ok(v.indexOf(['a', 'b', 'c'], 'b') == 1, 'indexOf b == 1');
    ok(v.indexOf(['x', 'y', 'z'], 'b') == -1, 'indexOf b == -1');
  });

  test('lastIndexOf', 2, function () {
    ok(v.lastIndexOf(['a', 'b', 'c'], 'c') == 2, 'indexOf c == 2');
    ok(v.lastIndexOf(['x', 'y', 'z'], 'b') == -1, 'indexOf b == -1');
  });

});

sink('Utility', function (test, ok) {
  test('extend', 2, function () {
    var o = {
      foo: 'bar'
    };
    var out = v.extend(o, { baz: 'thunk' });
    ok(out.foo == 'bar', 'contains foo property');
    ok(out.baz == 'thunk', 'contains baz property');
  });

  test('pluck', 1, function () {
    var o = [
      {a: 'foo'},
      {a: 'bar'},
      {a: 'baz'}
    ];
    var expected = ['foo', 'bar', 'baz'];
    ok(v.every(v.pluck(o, 'a'), function (el, i) {
      return el == expected[i];
    }, 'plucked foo bar baz'));
  });

  test('toArray', 1, function () {
    var el = document.getElementsByTagName('div');
    ok(v.toArray(el) instanceof Array, 'element collection is now an array');
  });

  test('size', 1, function () {
    ok(v.size(['a', 'b', 'c']) == 3, 'size is 3');
  });

  test('reject', 1, function () {
    var a = v.reject(['a', 'b', 'virus', 'c'], function (el) {
      return el === 'virus';
    });
    var expected = ['a', 'b', 'c'];
    ok(v.every(expected, function (el, i) {
      return el == a[i];
    }), 'filters out viruses');
  });

  test('find', 1, function () {
    ok(v.find(['a', 'b', 'c'], function (el) {
      return el === 'a';
    }) === 'a', 'found element "a"');
  });

  test('compact', 1, function () {
    ok(v.compact([,,,1,false,0,null,'']).length == 1, 'compacted [,,,1,false,0,null,""] to [1]');
  });

  test('flatten', 1, function () {
    var actual = v.flatten([['a', [[['b']], ['c']], 'd']]);
    var expected = ['a', 'b', 'c', 'd'];
    ok(v.every(actual, function (el, i) {
      return el == expected[i];
    }), 'flattened a really crappy looking array');
  });

  test('uniq', 1, function () {
    var actual = v.uniq(['a', 'a', 'a', 'b', 'b', 'c']);
    var expected = ['a', 'b', 'c'];
    ok(v.every(actual, function (el, i) {
      return el == expected[i];
    }), "turned ['a', 'a', 'a', 'b', 'b', 'c'] into ['a', 'b', 'c']");
  });

  test('first', 1, function () {
    ok(v.first(['a', 'b', 'c']) == 'a', 'a is first');
  });

  test('last', 1, function () {
    ok(v.last(['a', 'b', 'c']) == 'c', 'c is last');
  });

  test('keys', 1, function () {
    var actual = v.keys({
      a: 'foo',
      b: 'bar',
      c: 'baz'
    });
    var expected = ['a', 'b', 'c'];
    ok(v.every(actual, function (el, i) {
      return el == expected[i];
    }), "a, b, c were keys");
  });

  test('values', 1, function () {
    var actual = v.values({
      a: 'foo',
      b: 'bar',
      c: 'baz'
    });
    var expected = ['foo', 'bar', 'baz'];
    ok(v.every(actual, function (el, i) {
      return el == expected[i];
    }), "foo, bar, baz values were found");
  });

  test('trim', 1, function () {
    ok(v.trim(' \n\r  omg bbq wtf  \n\n ') === 'omg bbq wtf', 'string was trimmed');
  });

});

start();