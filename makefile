
default: build

build:
	cd ./app && npm run build
	cp -R ./app/dist/* .
	cp -R ./app/static .
