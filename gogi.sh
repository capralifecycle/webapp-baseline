#!/bin/bash
docker run -v $PWD:/project -w /project --user pwuser --network host --mount type=bind,source=/$PWD/playwright_screenshots,target=/project/playwright_screenshots  --rm -it mcr.microsoft.com/playwright:v1.37.0-jammy /bin/bash
