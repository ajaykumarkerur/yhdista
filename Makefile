export PATH := node_modules/.bin:$(PATH)
all: npm js

npm:
	npm i

js:
	browserify client.js > bundle.js

push:
	git push -f origin master:gh-pages

publish: js
	git add -f bundle.js
	git commit bundle.js -m "Compile assets"
	$(MAKE) push


server:
	python -m SimpleHTTPServer
