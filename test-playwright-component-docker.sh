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

cmd="npm run test:component"
if [ "${1:-}" = "--update" ]; then
  cmd="$cmd:update-snapshots"
  shift
fi

docker_image=mcr.microsoft.com/playwright:v1.40.0-jammy

docker pull "$docker_image"

code=1

# shellcheck disable=SC2086
docker run \
  --rm \
  -it \
  -v "$PWD:/data" \
  -e HOME \
  -v "$HOME:$HOME" \
  -u "$(id -u):$(id -g)" \
  -w /data \
  --network host \
  "$docker_image" \
  npm i && $cmd \
  || code=$?

exit $code
