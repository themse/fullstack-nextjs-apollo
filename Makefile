include .env

up:
	docker-compose -f ${DOCKER_CONFIG} up -d
rebuild:
	docker-compose -f ${DOCKER_CONFIG} up --build -d
down:
	docker-compose -f ${DOCKER_CONFIG} down
start:
	docker-compose -f ${DOCKER_CONFIG} start
stop:
	docker-compose -f ${DOCKER_CONFIG} stop
connect:
	docker-compose -f ${DOCKER_CONFIG} exec postgres bash
ps:
	docker-compose -f ${DOCKER_CONFIG} ps
config:
	docker-compose -f ${DOCKER_CONFIG} config

