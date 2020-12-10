# wishlist-service

## Pre-requisite
- Install node version v12.x
- Install postgres database to run integration testing
- Docker and Docker compose

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

## Databae configuration
Open file `datasources/db.datasource.ts` and setup database connection info

```js
const config = {
  name: 'db',
  connector: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'wishlist_service_db'
};
```

## Run the application
- Setup db configuration correctly and start postgres db locally
- Run command below to start server

```sh
npm start
```

## Run with docker
- Stop any postgres db run locally
- Update database configuration in file `datasources/db.datasource.ts` as below:
```js
const config = {
  name: 'db',
  connector: 'postgresql',
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'wishlist_service_db'
};
```
- Run command below to start server

```sh
docker-compose up --build
```

Open http://localhost:3000/explorer/# in your browser to see API doc


## Tests

- Setup db configuration correctly and start postgres db locally
- Run command below to execute test

```sh
npm test
```

## Need improve
- Add more test
