#!/bin/sh
set -e

cd build
[ -f 404.html ] || ln -s index.html 404.html
exec ../node_modules/.bin/http-server -p 3000
