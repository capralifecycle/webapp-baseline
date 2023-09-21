#!/bin/bash

npm run ladle:build
npm run preview &
./node_modules/.bin/wait-on http-get://localhost:3000
npm run ladle:update
