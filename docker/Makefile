TEMPLATE ?= default

all: run

pull:
	docker pull ubuntu:16.04

build: pull
	docker build --tag abba \
		--build-arg TEMPLATE=$(TEMPLATE) \
		$(dir $(realpath $(lastword $(MAKEFILE_LIST))))

run: build
	docker run --interactive --tty --rm \
		--name abba \
		--publish 8080:80 \
		abba

.PHONY: all pull build run
