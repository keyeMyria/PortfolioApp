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

## Install & Start Frontend Dev Server

```
$ cd client && yarn
$ yarn start
```

## Deploy Frontend to Github Pages

```
$ cd client && yarn deploy
```

## New App:
* find-replace template -> app_name
* find-replace tem -> app_name_shortened (not the same as app_name)
* mv api/tem api/app_name_shortened
* cd ../; mv tem app_name
* docker-compose run web bash
  * python manage.py migrate
  * python manage.py createsuperuser
* mv client/src/fonts/tem-fonts client/src/fonts/app_name_shortened-fonts
* sudo vim /etc/hosts
  * edit 127.0.0.1  localhost local.template.com -> 127.0.0.1 localhost local.app_name.com



## Useful Commands:
docker-compose run web bash

