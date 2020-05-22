setup:
	make stop
	make build
	make install

stop:
	docker-compose stop

build:
	docker-compose build

install:
	docker-compose run --rm web "yarn install"

start:
	docker-compose up web

down:
	docker-compose down
