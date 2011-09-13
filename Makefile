.PHONY: boosh test
boosh:
	node make/build.js
test:
	node tests/tests.js