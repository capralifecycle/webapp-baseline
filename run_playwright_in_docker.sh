#!/bin/bash

command="ladle:playwright"

if [ "$1" == "update" ] ; then
  command="ladle:playwright:update"
fi

docker run \
  -v $PWD:/project \
  -w /project \
  --user pwuser \
  --mount type=bind,source=/$PWD/playwright_screenshots,target=/project/playwright_screenshots \
  --rm \
  -it mcr.microsoft.com/playwright:v1.37.0-jammy \
  npm run $command
