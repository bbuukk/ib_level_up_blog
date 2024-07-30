# make is a program which builds and runs other programs.
#
# Primarily intended to help build C/C++ programs, it was adopted
# by backend developers as an easy an portable way to share common commands.
# Usually no need to learn this syntax, you write it once and then use it.

#
# IMPORTANT: the format uses TABS "\t" to indent commands
#

backend-init:
	- cp -n .env.example .env
	docker run --rm \
		-u "$$(id -u):$$(id -g)" \
		-v "$$(pwd):/var/www/html" \
		-w /var/www/html \
		laravelsail/php83-composer:latest \
		composer install --ignore-platform-reqs
	./vendor/bin/sail build
	./vendor/bin/sail artisan key:generate

backend-run: | backend-init
	./vendor/bin/sail up -d

migrate:
	./vendor/bin/sail artisan migrate

backend-up:
	./vendor/bin/sail up -d

migrate-fresh:
	./vendor/bin/sail artisan migrate:fresh

migrate-seed:
	./vendor/bin/sail artisan migrate:fresh --seed

test:
	./vendor/bin/sail artisan test

