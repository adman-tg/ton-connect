
default: build

build:
	cd ./app && npm run build
	rm -rf ./assets
	cp -R ./app/dist/* .
	cp -R ./app/static .
	rm -rf ./app/dist
