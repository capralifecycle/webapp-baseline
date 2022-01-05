#!/usr/bin/env bash
set -eu

# A temporary script to run Cypress tests similar as how it
# runs in Jenkins.
#
# We might keep this script for later since it allows us to
# run our tests with the same fonts and configuration as how
# we assert it during CI/CD.
#
# Some more work is needed to make it cross-platform.

update=0
if [ "${1:-}" = "--update" ]; then
  update=1
  shift
fi

cmd=${1:-"npm run test:cypress:docker"}

if [[ $(uname -a) == Linux* ]]; then
  base_url=http://localhost:3000
else
  base_url=http://host.docker.internal:3000
fi

docker_image=public.ecr.aws/z8l5l4v4/buildtools/tool/node:16-browsers

if [ $update -eq 1 ]; then
    # Before running tests, remove all current screenshots so they will be updated
    find cypress/integration -name "*.png" -print0 |
    while IFS= read -r -d '' line; do
      echo "Removing previous file: $line"
      rm -- "$line"
    done
fi

docker pull "$docker_image"

code=1

# shellcheck disable=SC2086
docker run \
  --rm \
  -it \
  -v "$PWD:/data" \
  -e HOME \
  -e "CYPRESS_BASE_URL=$base_url" \
  -e CYPRESS_CACHE_FOLDER=/cypress-cache \
  -v cypress-cache:/cypress-cache \
  -v "$HOME:$HOME" \
  -u "$(id -u):$(id -g)" \
  -w /data \
  --network host \
  "$docker_image" \
  $cmd \
  || code=$?

exit $code
