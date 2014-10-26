export PATH := node_modules/.bin:$(PATH)

build:
	npm i

js:
	browserify client.js > bundle.js

publish: js
	git add -f bundle.js
	git commit bundle.js -m "Compile assets"
	git push origin master:gh-pages


