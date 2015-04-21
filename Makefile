export PATH := node_modules/.bin:$(PATH)
all: npm js

npm:
	npm i

js:
	webpack -p

js-watch:
	webpack -w

push:
	git push -f origin master:gh-pages

publish: js
	git add -f bundle.js bundle.js.map
	git commit bundle.js -m "Compile assets"
	$(MAKE) push


server:
	python -m SimpleHTTPServer
