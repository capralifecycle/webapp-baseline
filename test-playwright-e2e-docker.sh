#!/usr/bin/env bash
set -eu

# A temporary script to run Playwright tests similar as how it
# runs in Jenkins.
#
# We might keep this script for later since it allows us to
# run our tests with the same fonts and configuration as how
# we assert it during CI/CD.
#
# Some more work is needed to make it cross-platform.

cmd="npm run test:e2e:docker"
if [ "${1:-}" = "--update" ]; then
  cmd="$cmd:update-snapshots"
  shift
fi

if [[ $(uname -a) == Linux* ]]; then
  base_url=http://localhost:3000
else
  base_url=http://host.docker.internal:3000
fi

playwrightVersion=$(cat package.json | jq -r '.devDependencies."@playwright/test"')
docker_image=mcr.microsoft.com/playwright:v$playwrightVersion-jammy

docker pull "$docker_image"

code=1

# shellcheck disable=SC2086
docker run \
  --rm \
  -it \
  -v "$PWD:/data" \
  -e "DOCKER_BASE_URL=$base_url" \
  -w /data \
  --network=host \
  "$docker_image" \
  $cmd \
  || code=$?

exit $code
