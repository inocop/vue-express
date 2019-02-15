#!/usr/bin/env bash

set -eux
cd $(dirname $0)

docker-compose build
docker-compose up -d
docker-compose exec app bash -c 'bash /opt/myapp/src/setup.sh'
docker-compose restart