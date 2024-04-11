DC=docker compose
DE=docker exec -it
P_PATH=docker-compose/postgres.yaml
A_PATH=docker-compose/app.yaml
R_PATH=docker-compose/react.yaml

# postgres ----------------
.PHONY: postgres
postgres:
	${DC} -f ${P_PATH} up -d

.PHONY: postgres-down
postgres-down:
	${DC} -f ${P_PATH} down

# app ---------------------
.PHONY: migrations
migrations: 
	${DE} app python school_feeding/manage.py makemigrations

.PHONY: migrate
migrate: 
	${DE} app python school_feeding/manage.py migrate

.PHONY: createsuperuser
createsuperuser:
	${DE} app python school_feeding/manage.py createsuperuser

# project -----------------
.PHONY: project
project:
	${DC} -f ${P_PATH} -f ${A_PATH} up

.PHONY: project-down
project-down:
	${DC} -f ${A_PATH} -f ${P_PATH} down

.PHONY: project-logs
project-logs:
	docker logs app -f

.PHONY: react
react:
	${DC} -f ${R_PATH} up

.PHONY: react-down
react-down:
	${DC} -f ${R_PATH} down
