# test assignment films
Films Test Assignment REST API using Node.js

## Requirements

## Built With
- Node.js (v12.14.1)
- Typescript
- Express
- Mongoose
- Jest with Supertest for testing and coverage

## RUNNING APP WITH DOCKER
Docker & docker-compose must be installed

```bash
$ docker-compose up --build
```

## RUNNING APP WITHOUT DOCKER

## Dependency Installation

```bash
$ yarn 
```
## Running the app

```bash
# copy env.example to env (you can change the default port which is 3000)
$ cp .env.example env

change MONGODB_URL to your mongodb instance connection URL (Mongodb should be installed and running)

# build app
$ yarn build

# start app
$ yarn start

# app is running on
http://localhost:3000/

```
## Testing the app

```bash
# unit tests with coverage
$ yarn test

```

## Docs

```bash
# swagger api doc
http://localhost:3000/api/v1/docs/

```

## Swagger API doc UI

![Swagger UI](https://github.com/yogeshkathayat/test-assignment-films/raw/master/swagger.png)

## coverage report

![Unit Test with coverage](https://github.com/yogeshkathayat/test-assignment-films/raw/master/coverage.png)
