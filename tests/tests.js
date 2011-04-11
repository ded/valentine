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
});

start();