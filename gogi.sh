
#!/bin/bash

docker_image="mcr.microsoft.com/playwright:v1.40.0-jammy"

if [ "$1" == "update" ] ; then
  command="test:component:update-snapshots"
else
  command="test:component"
fi

docker pull $docker_image

docker run \
  --volume $PWD:/project \
  --workdir /project \
  --user pwuser \
  --mount type=bind,source=$PWD/playwright_screenshots,target=/project/playwright_screenshots \
  --rm \
  -it $docker_image \
  rm -rf playwright/.cache && npm run $command
