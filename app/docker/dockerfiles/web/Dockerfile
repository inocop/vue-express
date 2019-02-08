FROM ubuntu:18.04

RUN apt update \
# node install \
&&  curl --silent --location https://deb.nodesource.com/setup_8.x | bash - \
&&  apt install nodejs \
# disk clean \
&&  apt clean \
&&  rm -rf /var/lib/apt/lists/*

