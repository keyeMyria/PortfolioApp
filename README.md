# Template

## Requirements

* [docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)
* [docker-compose](https://docs.docker.com/compose/install/#install-compose)
* [yarn](https://yarnpkg.com/en/docs/install)

## Install & Start Backend Dev Services

```
$ docker-compose build
$ docker-compose up
```
### Encountering errors when doing above
If you see this message when trying to start the backend:
```
Is the server running locally and accepting connections on Unix domain socket "/var/run/postgresql/.s.PGSQL.5432"?
```
, then create a symlink: ln -s /tmp/.s.PGSQL.5432 /var/run/postgresql/.s.PGSQL.5432
This is usually caused by multiple docker containers running at the same time.

## Install & Start Frontend Dev Server

```
$ cd client && yarn
$ yarn start
```

## Deploy Frontend to Github Pages

```
$ cd client && yarn deploy
```

## Notes
Make sure /etc/hosts is correct
-> 127.0.0.1  localhost local.portfolio.com


## Useful Commands:
docker-compose run web bash
django admin user : root, password : portfolioroot
